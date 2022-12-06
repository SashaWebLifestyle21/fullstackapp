import { Router } from 'express'
import {createCar, getAllCars, removeCar, updateCar} from '../controllers/car.js';
import { checkAuth } from "../middleware/checkAuth.js";
import fileMiddleware from '../middleware/file.js'
const router = new Router()

// createCar
router.post('/', checkAuth, createCar)

// get all cars
router.get('/', getAllCars)

// update car
router.put('/update', updateCar)

// update car
router.delete('/remove/:id', removeCar)

export default router