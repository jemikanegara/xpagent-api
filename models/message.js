const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Message = new Schema({
    messageSender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    messageConversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Message", Message)