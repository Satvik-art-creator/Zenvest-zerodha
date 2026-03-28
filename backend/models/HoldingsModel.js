const mongoose = require("mongoose");
const HoldingsSchema = require("../schemas/HoldingsSchema.js");

const HoldingsModel = mongoose.model("Holding", HoldingsSchema);

module.exports = HoldingsModel;