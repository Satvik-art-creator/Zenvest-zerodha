const jwt = require("jsonwebtoken");
const User = require("../models/UsersModel");

const userController = async (req, res) => {
  try {
    let userId = req.userId;

    if (!userId) {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Not authenticated",
        });
      }

      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      userId = decoded.id;
    }

    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = userController;
