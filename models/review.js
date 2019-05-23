const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Review = new Schema({
    reviewOrder: {
        type: Schema.Types.ObjectId,
        ref: "Schedule"
    },
    reviewRating: {
        type: String,
        required: true
    },
    reviewComment: {
        type: String
    }
})

module.exports = mongoose.model("Review", Review)