import Car from "../models/Car.js";
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import User from "../models/User.js";

// Create Car
export const createCar = async (req, res) => {
    try {
        const { brand, model, engine, color, transmission, price, fuel, power, acceleration, count, drive, type, pathUrl } = req.body
        if (!req.files) {
            return res.json({ message: 'Не найдено req.files' })
        }
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
                count,
                color,
                transmission,
                price,
                imgUrl: imgName,
                pathUrl
            })
            await newCarWithImage.save()
            return res.json({ message: 'Автомобиль создан', car: newCarWithImage })
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
                color,
                count,
                transmission,
                price,
                pathUrl,
                imgUrl: ''
        })

        await newCarWithoutImage.save()
        return res.json({ message: 'Автомобиль создан без картинки', car: newCarWithoutImage })
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

// Remove Car
export const removeCar = async (req, res) => {
    const { id } = req.params
    try {
        const car = await Car.findByIdAndDelete(id)
        if(!car) return res.json({ message: 'Такого автомобиля не существует' })

        res.json({ message: 'Автомобиль успешно удален' })

    } catch (e) {
        res.json({ message: 'Ошибка при удалении автомобилей' })
    }
}

// Update Car
export const updateCar = async (req, res) => {
    try {
        const { brand, model, engine, color, transmission, price, fuel, power, acceleration, count, drive, type, pathUrl, id } = req.body
        const car = await Car.findById(id)

        if (req.files) {
            let imgName = `${brand}_${model}.${req.files.img.mimetype.slice(6)}`
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.img.mv(path.join(__dirname, '..', 'public', 'Image', 'Cars', imgName))
            car.imgUrl = imgName
        }

        car.brand = brand
        car.model = model
        car.engine = engine
        car.color = color
        car.transmission = transmission
        car.price = price
        car.fuel = fuel
        car.power = power
        car.acceleration = acceleration
        car.count = count
        car.drive = drive
        car.type = type
        car.pathUrl = pathUrl

        await car.save()
        res.json({ car })
    } catch (e) {
        res.json({ message: 'Ошибка при обновлении автомобиля' })
    }
}