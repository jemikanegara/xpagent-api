const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Conversation = new Schema({
    conversationUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    conversationAgent: {
        type: Schema.Types.ObjectId,
        ref: "Agent"
    },
    conversationMessages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
}, { timestamps: true })

module.exports = mongoose.model("Conversation", Conversation)