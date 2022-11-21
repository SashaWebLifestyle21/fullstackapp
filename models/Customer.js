import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    bought: [{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}],
})

export default mongoose.model('Customer', CustomerSchema)