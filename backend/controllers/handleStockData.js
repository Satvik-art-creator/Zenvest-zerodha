const HoldingsModel = require("../models/HoldingsModel");
const PositionsModel = require("../models/PositionsModel");
const OrdersModel = require("../models/OrdersModel");
const User = require("../models/UsersModel");

module.exports.createOrder = async (req, res) => {
  try {

    let { name, product, qty, price, mode } = req.body;
    const userId = req.userId;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (qty <= 0 || price <= 0) {
      return res.status(400).json({ error: "Invalid quantity or price" });
    }

    const totalPrice = qty * price;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let status = "Passed";
    let message = "";

    /* -------------------- BUY VALIDATION -------------------- */

    if (mode === "BUY") {

      if (user.balance < totalPrice) {
        status = "Failed";
        message = "Balance is low";
      }

      if (user.balance === totalPrice) {
        status = "Failed";
        message = "Total balance cannot be zero";
      }

    }

    /* -------------------- SELL VALIDATION -------------------- */

    if (mode === "SELL") {

      const holding = await HoldingsModel.findOne({
        user: userId,
        name
      });

      const position = await PositionsModel.findOne({
        user: userId,
        name
      });

      if (!holding || !position) {
        status = "Failed";
        message = !holding
          ? "You don't have this holding"
          : "You don't have this position";
      }

      else if (holding.qty < qty || position.qty < qty) {
        status = "Failed";
        message = holding.qty < qty
          ? "Insufficient holding quantity"
          : "Insufficient position quantity";
      }

    }

    /* -------------------- SAVE ORDER (EVEN FAILED) -------------------- */

    const newOrder = new OrdersModel({
      name,
      product,
      qty,
      price,
      mode,
      user: userId,
      status
    });

    await newOrder.save();

    /* -------------------- RETURN IF FAILED -------------------- */

    if (status === "Failed") {
      return res.json({
        success: false,
        message
      });
    }

    /* -------------------- UPDATE USER BALANCE -------------------- */

    if (mode === "BUY") {
      user.balance -= totalPrice;
    } else {
      user.balance += totalPrice;
    }

    await user.save();

    const ltp = price;
    const randomChange = ltp * (Math.random() * 0.02 - 0.01);
    const prevClose = ltp - randomChange;

    /* -------------------- HOLDINGS (CNC) -------------------- */

    if (product === "CNC") {

      let holding = await HoldingsModel.findOne({
        user: userId,
        name
      });

      if (mode === "BUY") {

        if (!holding) {

          const avg = price;
          const net = ((ltp - avg) / avg) * 100;
          const day = ((ltp - prevClose) / prevClose) * 100;

          const newHolding = new HoldingsModel({
            name,
            qty,
            avg,
            price,
            net,
            day,
            user: userId
          });

          await newHolding.save();

        } else {

          const oldQty = holding.qty;
          const oldAvg = holding.avg;

          const totalInvestment = oldQty * oldAvg + qty * price;
          const totalQty = oldQty + qty;

          const newAvg = totalInvestment / totalQty;

          holding.qty = totalQty;
          holding.avg = newAvg;
          holding.net = ((ltp - newAvg) / newAvg) * 100;
          holding.day = ((ltp - prevClose) / prevClose) * 100;

          await holding.save();
        }

      } else {

        holding.qty -= qty;

        if (holding.qty === 0) {
          await HoldingsModel.deleteOne({
            user: userId,
            name
          });
        } else {
          await holding.save();
        }

      }

    }

    /* -------------------- POSITIONS -------------------- */

    if (mode === "SELL") {

      let position = await PositionsModel.findOne({
        user: userId,
        name
      });

      if (!position) {

        const avg = price;
        const net = ((ltp - avg) / avg) * 100;
        const day = ((ltp - prevClose) / prevClose) * 100;

        const newPosition = new PositionsModel({
          product,
          name,
          qty,
          price,
          net,
          day,
          user: userId
        });

        await newPosition.save();

      } else {

        const oldQty = position.qty;
        const oldAvg = position.avg;

        const totalInvestment = oldQty * oldAvg + qty * price;
        const totalQty = oldQty + qty;

        const newAvg = totalInvestment / totalQty;

        position.qty = totalQty;
        position.avg = newAvg;
        position.net = ((ltp - newAvg) / newAvg) * 100;
        position.day = ((ltp - prevClose) / prevClose) * 100;

        await position.save();

      }

    }

    /* -------------------- SUCCESS RESPONSE -------------------- */

    return res.json({
      success: true,
      message: "Order executed successfully"
    });

  }

  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};