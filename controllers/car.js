import Car from "../models/Car.js";
// import User from "../models/User";
import path, { dirname } from 'path'
import { fileURLToPath } from "url";

// Create Car
export const createCar = async (req, res) => {
    try {
        const { brand, model, engine, color, transmission, price, fuel, power, acceleration, drive, type } = req.body
        // const user = await User.findById(req.userId)
        console.log('filesss ',req.files.img.mimetype.slice(6))
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
                imgUrl: imgName
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