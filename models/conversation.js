const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Conversation = new Schema({
    conversationUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    conversationDriver: {
        type: Schema.Types.ObjectId,
        ref: "Driver"
    }
}, { timestamps: true })

module.exports = mongoose.model("Conversation", Conversation)