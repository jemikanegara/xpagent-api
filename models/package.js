const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Package = new Schema({
    packageName: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    packageDriver: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    },
    packageDescription: {
        type: String,
        required: true
    },
    packageImage: {
        type: String,
        required: true
    },
    packageDuration: {
        type: Number,
        required: true
    },
    packageCustomer: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Package", Package)