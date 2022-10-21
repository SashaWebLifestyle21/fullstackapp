import { Router } from 'express'
import {createCar, getAllCars} from '../controllers/car.js';
import { checkAuth } from "../middleware/checkAuth.js";
import fileMiddleware from '../middleware/file.js'
const router = new Router()

// createCar
router.post('/', checkAuth, createCar)

// get all cars
router.get('/', getAllCars)
export default router