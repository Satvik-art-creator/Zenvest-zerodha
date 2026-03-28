const {valdFundSchema} = require("../schema.js");

module.exports.validateFund = (req, res, next) => {
  const { error } = valdFundSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
