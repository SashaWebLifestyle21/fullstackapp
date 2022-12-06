import {Router} from "express";
import {getAll} from "../controllers/manager.js";


const router = new Router()

// create comment
router.get('/getAll', getAll)

export default router