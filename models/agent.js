const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Agent = new Schema(
  {
    agentName: {
      type: String,
      required: true
    },
    agentPhoto: {
      type: String,
      required: true
    },
    agentDescription: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 1000
    },
    agentUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", Agent);
