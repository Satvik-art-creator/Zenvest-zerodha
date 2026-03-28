const {valdOrderSchema} = require("../schema.js");

module.exports.validateOrder = (req, res, next) => {
  const { error } = valdOrderSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
