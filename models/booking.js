const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Booking = new Schema({
    scheduleDetail: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Invoice"
    },
    scheduleConfirmation: {
        type: String,
        required: true,
        enum: ["ACCEPTED", "REJECTED", "PENDING"],
        default: "PENDING"
    },
    scheduleCancelled: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", Booking)