const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Driver = new Schema({
    driverName: {
        type: String,
        required: true
    },
    driverPhoto: {
        type: String,
        required: true
    },
    driverCar: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Driver", Driver)