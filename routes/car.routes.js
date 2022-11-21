import { Router } from 'express'
import {createCar, getAllCars, addWishlist, getWishlist, removeCarWishlist} from '../controllers/car.js';
import { checkAuth } from "../middleware/checkAuth.js";
import fileMiddleware from '../middleware/file.js'
const router = new Router()

// createCar
router.post('/', checkAuth, createCar)

// get all cars
router.get('/', getAllCars)

// add car in wishlist
router.put('/addWishlist/:id', checkAuth, addWishlist)

//get cars wishlist
router.get('/getWishlist', checkAuth, getWishlist)

// remove car wishlist
router.delete('/removeWishlist/:id', checkAuth, removeCarWishlist)
export default router