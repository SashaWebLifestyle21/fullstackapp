import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    engine: {type: String, required: true},
    type: {type: String, required: true},
    fuel: {type: String, required: true},
    power: {type: String, required: true},
    acceleration: {type: String, required: true},
    drive: {type: String, required: true},
    color: {type: String, required: true},
    transmission: {type: String, required: true},
    count: {type: Number, required: true},
    price: {type: Number, required: true},
    imgUrl: {type: String, default: ''},    
    pathUrl: {type: String, default: ''},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

export default mongoose.model('Car', CarSchema)