const HoldingsModel = require("../models/HoldingsModel");
const PositionsModel = require("../models/PositionsModel");
const OrdersModel = require("../models/OrdersModel");

module.exports.getHoldings = async (req, res) => {
  const allHoldings = await HoldingsModel.find({user: req.userId});
  res.status(201).json(allHoldings);
}

module.exports.getPositions = async (req, res) => {
  const allPositions = await PositionsModel.find({user: req.userId});
  res.status(201).json(allPositions);
}

module.exports.getOrders = async (req, res) => {
  const allOrders = await OrdersModel.find({user: req.userId});
  res.status(201).json(allOrders);
}