import mongoose from "mongoose";
import { PROCESSED, APPROVED } from "../constants/statusOrder.js";

const OrderSchema = new mongoose.Schema({
    carId: {type: mongoose.Schema.Types.ObjectId, ref: 'Car'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    managerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
    status: {type: String, default: PROCESSED},
    guarantee: {type: Date, default: ''},
    message: {type: String}
})

export default mongoose.model('Order', OrderSchema)