const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    userPassword: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("User", User)