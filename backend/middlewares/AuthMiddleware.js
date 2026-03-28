const User = require("../models/UsersModel.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { clearAuthCookieOptions } = require("../utils/CookieOptions");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authenticated. Please login." });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id);

    if (!user) {
      res.clearCookie("token", clearAuthCookieOptions);
      return res.status(401).json({ success: false, message: "Account not found. Please login again." });
    }

    if (!user.isVerified) {
      res.clearCookie("token", clearAuthCookieOptions);
      return res.status(403).json({ success: false, message: "Email not verified." });
    }

    req.userId = data.id;
    req.authUser = user;
    return next();
  } catch (err) {
    res.clearCookie("token", clearAuthCookieOptions);
    return res.status(401).json({ success: false, message: "Session expired. Please login again." });
  }
};

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, success: false });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id);

    if (!user || !user.isVerified) {
      return res.json({ status: false, success: false });
    }

    return res.json({ status: true, success: true, user: user.username });
  } catch (err) {
    return res.json({ status: false, success: false });
  }
};