import {Router} from "express";
import {checkAuth} from "../middleware/checkAuth.js";
import {createComment} from "../controllers/comment.js";

const router = new Router()

// create comment
router.post('/:id', checkAuth, createComment)

export default router