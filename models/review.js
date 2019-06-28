const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Review = new Schema({
    reviewOrder: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true
    },
    reviewPackage: {
        type: Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    reviewInvoice: {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
        required: true
    },
    reviewRating: {
        type: Number,
        required: true
    },
    reviewComment: {
        type: String
    }
})

module.exports = mongoose.model("Review", Review)