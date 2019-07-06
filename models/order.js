const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Package = require('./packageSchema')

const Order = new Schema({
    orderPackage: {
        type: Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    orderUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderAmount: {
        type: Number,
        required: true
    },
    orderSchedule: {
        type: Date,
        required: true,
        default: Date.now()
    },
    orderPassengers: {
        type: [String],
        required: true,
        default: undefined
    },
    orderNote: {
        type: String
    },
    orderCheckoutPackage: {
        type: Package
    },
    orderDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", Order)
