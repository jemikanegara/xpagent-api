const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Invoice = new Schema({
    invoiceOrders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }],
    invoicePaid: {
        type: Boolean,
        required: true,
        default: false
    },
    invoiceAmount: {
        type: Number,
        required: true
    },
    invoicePaymentMethod: {
        type: String,
        required: true,
        enum: ["VISA", "MASTERCARD", "AMEX", "PAYPAL", "TRANSFER", "CASH"]
    },
    invoiceContact: [{
        type: Schema.Types.ObjectId,
        ref: "Phone",
        required: true
    }]
}, { timestamps: true })

module.exports = mongoose.model("Invoice", Invoice)