import Car from "../models/Car.js";
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import User from "../models/User.js";

// Create Car
export const createCar = async (req, res) => {
    try {
        const { brand, model, engine, color, transmission, price, fuel, power, acceleration, drive, type, pathUrl } = req.body
        if (!req.files) {
            return res.json({ message: 'Не найдено req.files' })
        }
        const colorsCar = JSON.parse(color)
        if(req.files) {
            let imgName = `${brand}_${model}.${req.files.img.mimetype.slice(6)}`

            const __dirname = dirname(fileURLToPath(import.meta.url))

            req.files.img.mv(path.join(__dirname, '..', 'public', 'Image', 'Cars', imgName))

            const newCarWithImage = new Car({
                brand,
                model,
                engine,
                fuel,
                type,
                power,
                acceleration,
                drive,
                color: colorsCar,
                transmission,
                price,
                imgUrl: imgName,
                pathUrl
            })

            await newCarWithImage.save()
            return res.json({ message: 'Автомобиль создан' })
        }

        const newCarWithoutImage = new Car({
                brand,
                model,
                engine,
                fuel,
                type,
                power,
                acceleration,
                drive,
                color: colorsCar,
                transmission,
                price,
                pathUrl,
                imgUrl: ''
        })

        await newCarWithoutImage.save()
        return res.json({ message: 'Автомобиль создан без картинки' })
    } catch (error) {
        return res.json({ message: 'Ошибка при создании автомобиля' })

    }
}

// Get All Cars
export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().sort('-createdAt')
        if (!cars) {
            return res.json({ message: 'Нет Автомобилей' })
        }

        res.json({ cars })
    } catch (e) {
        res.json({ message: 'Ошибка при загрузке автомобилей' })
    }
}

// Add Car in Wishlist
export const addWishlist = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        const user = await User.findById(req.userId)

        if(!user.wishlist.includes(car._id)) {
            await User.findByIdAndUpdate(req.userId, {
                $push: { wishlist: car}
            })
            res.json({ message: 'Добавлено в понравившиеся' })
        } else {
            res.json({ message: 'вы уже добавили этот авто в понравившиеся' })
        }


    } catch (e) {
        res.json({ message: 'Ошибка при обавлении в понравившиеся' })
    }
}

// get Cars Wishlist
export const getWishlist = async (req, res) => {
    try {

        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.wishlist.map(car => {
                return Car.findById(car)
            })
        )
        res.json(list)
    } catch (e) {
        res.json({ message: 'Ошибка при обавлении в понравившиеся' })
    }
}

// remove car wishlist
export const removeCarWishlist = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $pull: { wishlist: req.params.id }
        })
        res.json({ id: req.params.id, message: 'Автомобиль удален из понравившихся' })
    } catch (e) {
        res.json({ message: 'Ошибка при удалении' })
    }
}