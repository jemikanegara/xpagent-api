const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Phone = new Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    phoneUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Phone", Phone)