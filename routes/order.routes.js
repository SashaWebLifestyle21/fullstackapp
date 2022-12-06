import { Router } from 'express'
import {checkAuth} from "../middleware/checkAuth.js";
import {createOrder, getOrdersByStatus, updateOrder, getAllOrders, getOrdersByUserId, createPDF, fetchPDF} from "../controllers/order.js";

const router = new Router()

// create order
router.post('/', checkAuth, createOrder)

// get all orders
router.get('/getAllOrders', getAllOrders)

// get orders by status
router.get('/getOrdersByStatus', getOrdersByStatus)

// get orders by userID
router.get('/getOrdersByUser/:id', getOrdersByUserId)

// update Order
router.put('/updateOrder', updateOrder)

// create pdf
router.post('/createPDF', createPDF)


// create pdf
router.get('/fetchPDF', fetchPDF)


export default router