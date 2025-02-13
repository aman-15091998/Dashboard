import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    sold: {
        type: Boolean,
        required: true,
        default: false
    },
    dateOfSale: {
        type: Date,
        required: true
    }
});

export const transactionModel = mongoose.model('Transaction', transactionSchema);
