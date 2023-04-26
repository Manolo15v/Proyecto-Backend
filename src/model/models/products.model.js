import {Schema, model} from "mongoose";

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    urlImage: {
        type: String,
        max: 200
    },
    stock: {
        type: Number,
        required: true,
        max: 5000
    }
})

export const productosModel = model("productos", productsSchema)