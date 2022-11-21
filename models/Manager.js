import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    count: {type: Number, default: 0}
})

export default mongoose.model('Manager', ManagerSchema)