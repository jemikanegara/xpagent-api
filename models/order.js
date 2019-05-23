const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Order = new Schema({
    orderPackage: {
        type: Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    orderUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderPassengers: {
        type: [String],
        required: true
    },
    orderNote: {
        type: String
    },
    orderDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("Order", Order)
