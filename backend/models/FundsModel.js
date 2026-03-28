const mongoose = require("mongoose");
const FundsSchema = require("../schemas/FundsSchema");

const Fund = mongoose.model("Fund", FundsSchema);

module.exports = Fund;