const mongoose = require("mongoose");
const Package = require("./packageSchema")

module.exports = mongoose.model("Package", Package);
