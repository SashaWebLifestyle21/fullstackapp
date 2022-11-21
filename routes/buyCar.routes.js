import { Router } from 'express'
import {checkAuth} from "../middleware/checkAuth.js";

const router = new Router()

// create
router.post('/', checkAuth, createBuyCar)