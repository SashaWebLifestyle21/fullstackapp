import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Order from "../models/Order.js";
import Manager from "../models/Manager.js";

// create order
export const createComment = async (req, res) => {
    try {
        const { managerId, comment } = req.body

        if(!comment) {
            return res.json({ message: 'Коментарий не может быть пустым' })
        }

        const newComment = new Comment({ comment })
        await newComment.save()

        try {
            await Manager.findByIdAndUpdate(managerId, {
                $push: { comments: newComment }
            })
        } catch (e) {
            return res.json({ message: 'Ошибка при присвоении коммента менеджеру' })
        }
        res.json({ newComment })
    } catch (e) {
        res.json({ message: 'Ошибка при создании поста' })
    }
}