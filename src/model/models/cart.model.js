import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ]
});

export const cartModel = model("cart", cartSchema);