import User from "../models/User.js";
import Car from "../models/Car.js";
import Order from "../models/Order.js";
import { APPROVED, PROCESSED, REFUSED } from "../constants/statusOrder.js";
import mongoose from "mongoose";
import path, { dirname } from 'path'
import PDFDocument from "pdfkit";
import fs from "fs";
import {fileURLToPath} from "url";
import Manager from "../models/Manager.js";

// create order
export const createOrder = async (req, res) => {
    const user = await User.findById(req.userId)
    const car = await Car.findById(req.body.carId)
    const order = new Order({
        carId: car,
        userId: user
    })

    await order.save()

    return res.json({ message: 'Заявка отправлена' })
}

// get all orders
export const getAllOrders = async (req, res) => {
    try {
        Order.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user",
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                "$lookup": {
                    "from": "cars",
                    "localField": "carId",
                    "foreignField": "_id",
                    "as": "car"
                }
            },
            {
                $unwind: {
                    path: '$car'
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "car": { "$first": "$car" },
                    "user": { "$first": "$user" },
                    "status": { "$first": "$status" },

                }
            }
        ]).then(orders => res.json({ orders }))

    } catch (e) {
        res.json({ message: 'Ошибка при загрузке заказов' })
    }
}

// get orders by status
export const getOrdersByUserId = async (req, res) => {
    const userId = req.params.id
    try {
        // const orders = await Order.find({ userId: {"$in": userId} })
        // console.log('ord ', orders)
        // res.json({orders})


       Order.aggregate([
            { "$match" : { "userId": mongoose.Types.ObjectId(userId)} },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user",
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
           {
               "$lookup": {
                   "from": "users",
                   "localField": "managerId",
                   "foreignField": "_id",
                   "as": "manager",
               }
           },
           {
               $unwind: {
                   path: '$manager'
               }
           },
            {
                "$lookup": {
                    "from": "cars",
                    "localField": "carId",
                    "foreignField": "_id",
                    "as": "car"
                }
            },
            {
                $unwind: {
                    path: '$car'
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "car": { "$first": "$car" },
                    "user": { "$first": "$user" },
                    "manager": { "$first": "$manager" },
                    "status": { "$first": "$status" },
                    "guarantee": { "$first": "$guarantee" },

                }
            }
        ]).then(order => res.json({order}))

    } catch (e) {
        res.json({ message: 'ошибка при запросе заявок' })
    }

}

// get orders by status
export const getOrdersByStatus = async (req, res) => {
    try {

        Order.aggregate([
            // {
            //     "$match": { status: "PROCESSED" }
            // },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user",
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                "$lookup": {
                    "from": "cars",
                    "localField": "carId",
                    "foreignField": "_id",
                    "as": "car"
                }
            },
            {
                $unwind: {
                    path: '$car'
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "car": { "$first": "$car" },
                    "user": { "$first": "$user" },
                    "status": { "$first": "$status" },

                }
            }
        ]).then(result => res.json({ result }))
    } catch (e) {
        res.json({ message: 'ошибка при запросе заявок' })
    }

}

// update order
export const updateOrder = async (req, res) => {
    try {
        console.log('req.body', req.body.id)
        const { id, status, orderId, managerId } = req.body
        console.log('maid ', managerId)
        if(status === APPROVED) {
            console.log('manid',managerId)
            const car = await Car.findByIdAndUpdate(id, {
                $inc: { count: -1 },
            }, {new: true})

            const userManager = await User.findById(managerId)

            const manager = await Manager.find({userId: managerId})

            await Manager.findByIdAndUpdate(manager[0]._id, {
                $inc: { count: 1 },
            })

            const order = await Order.findByIdAndUpdate(orderId, {
                status: APPROVED,
                guarantee: Date.now(),
                managerId: userManager
            }, {new: true})

            return res.json({order, car, userManager})
        }
        if(status === REFUSED) {
            const order = await Order.findByIdAndUpdate(orderId, {
                status: REFUSED,
                managerId
            })
            console.log('order otkz', order)
            return res.json({ order })
        }


    } catch (e) {
        res.json({ message: 'Ошибка при подтверждении' })
    }

}

export const createPDF = async (req, res) => {
    const { user, manager, car, status, guarantee } = req.body
    try {
        const fileName = `${user.email}${car.brand}${car.model}.pdf`
        const pdfPath = path.join('data', fileName)
        const doc = new PDFDocument()
        console.log('pdfFile', pdfPath)


        res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '" ')
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/pdf')

        res.status(201)
        doc.pipe(fs.createWriteStream(pdfPath));
        await doc.pipe(res);


        doc.text('Order info')

        doc.text(`${car.brand} ${car.model}`)
        doc.text(`Price: ${car.price}$`)
        doc.text(`Manager: ${manager.username} ${manager.email}`)
        doc.text(`Buyer: ${user.username} ${user.email}`)
        doc.text(`status: ${status}`)
        doc.text(`Date of purchased: ${guarantee}`)
        doc.end()

    } catch (e) {
        res.json({message: 'Ошибка при пдф'})
    }
}

export const fetchPDF = async (req, res) => {

    try {

        let fileRead = fs.createReadStream('data/sasha@mail.ruBMW5 series.pdf')
        res.contentType("application/pdf")
        res.send(fileRead)

    } catch (e) {
        res.json({message: 'Ошибка при пдф'})
    }
}
