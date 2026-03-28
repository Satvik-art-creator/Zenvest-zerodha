const User = require("../models/UsersModel");
const Fund = require("../models/FundsModel");

module.exports.getFunds = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const fundsData = await Fund.find({ user: req.userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      funds: fundsData,
      balance: user.balance
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.postFund = async (req, res) => {
  let { type, amount } = req.body;
  let {userId} = req;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    //check
    if (type === "Withdraw") {
      if (amount > user.balance) {
        return res
          .status(200)
          .json({ success: false, message: "Insufficient balance" });
      }
      if (amount === user.balance) {
        return res
          .status(200)
          .json({ success: false, message: "Balance cannot be zero" });
      }
      user.balance -= amount;
    } else if (type === "Deposit") {
      user.balance += amount;
    }

    await user.save();

    const fund = await Fund.create({ user: userId, type, amount });
    // console.log(fund);
    return res.status(200).json({
      success: true,
      message: `Fund ${type === "Deposit" ? "deposited" : "withdrawn"} successsfully!`,
      balance: user.balance, //updated balance send to frontend
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
