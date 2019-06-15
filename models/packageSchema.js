const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Package = new Schema({
    packageName: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    packageAgent: {
        type: Schema.Types.ObjectId,
        ref: "Agent",
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
});

module.exports = Package