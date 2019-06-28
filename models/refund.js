const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Refund = new Schema({
    refundInvoice: {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
        required: true
    },
    refundAmount: {
        type: Number,
        required: true
    },
    refundUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    refundAgent: {
        type: Schema.Types.ObjectId,
        ref: "Agent",
        required: true
    }
})

module.exports = mongoose.model("Refund", Refund)