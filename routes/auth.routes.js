import { Router } from 'express'
import User from '../models/User.js'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "config";
import {checkAuth} from "../middleware/checkAuth.js";
import Car from "../models/Car.js";
import Customer from "../models/Customer.js";
import Manager from "../models/Manager.js";
const router = new Router()

// /api/user/register
router.post(
    '/register',
    [
      check('email', 'Некорректный email').isEmail(),
      check('password', 'Минимальная длина 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.json({ message: 'Некорректные данные при регистрации' })
        }

        const {username, email, password, role} = req.body

        const candidate = await User.findOne({ email })

        if(candidate) {
            return res.json({ message: 'Пользователь с таким email уже существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ username, email, password: hashedPassword, role })

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        await user.save()
        if(role === 'USER') {
            const customer = new Customer({userId: user, })
            await customer.save()
            res.status(201).json({
                user,
                token,
                message: 'Пользователь создан'
            })
        }
        if(role === 'MANAGER') {
            const manager = new Manager({userId: user})
            await manager.save()
            res.status(201).json({
                user,
                token,
                message: 'Менеджер создан'
            })
        }



    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

// /api/user/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                res.json({ errors: errors.array(), message: 'Некорректные данные при входе в систему' })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if(!user) {
                return res.json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({
                token,
                user: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
                },
                message: 'Вы вошли в систему'
            })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
})

router.get(
    '/getMe',
    checkAuth,
    async (req, res) => {
        try {
            const user = await User.findById(req.userId)

            if (!user) {
                return res.json({
                    message: 'Такого пользователя не существует.',
                })
            }

            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            const wishlist = await Promise.all(
                user.wishlist.map(car => {
                    return Car.findById(car)
                })
            )
            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    wishlist
                },
                token,
            })
        } catch (e) {
            res.json({ message: 'Нет доступа' })
        }

    }
)

export default router