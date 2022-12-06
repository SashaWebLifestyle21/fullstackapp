import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

export default mongoose.model('Customer', CustomerSchema)