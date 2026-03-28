const {valdUserSchema} = require("../schema.js");

module.exports.validateUser = (req, res, next) => {
  const { error } = valdUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
