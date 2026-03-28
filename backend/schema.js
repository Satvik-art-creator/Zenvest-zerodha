const Joi = require("joi");

module.exports.valdUserSchema = Joi.object({
  name: Joi.string().required(),

  username: Joi.string()
    .alphanum()
    .pattern(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z][A-Za-z0-9]{3,14}$/)
    .min(4)
    .max(15)
    .required()
    .messages({
      "string.pattern.base":
        "Username must start with a letter and be 4–15 characters long and contain both letters and numbers",
    }),

  number: Joi.string()
    .length(10)
    .pattern(/^[1-9][0-9]{9}$/)
    .required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_#])[A-Za-z\d@_#]{8,}$/)
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character (@, _, #)",
    }),

  balance: Joi.number().optional(),

  createdAt: Joi.date(),
});

module.exports.valdOrderSchema = Joi.object({
  name: Joi.string().required(),
  product: Joi.string().required(),
  qty: Joi.number().positive().integer().required(),
  price: Joi.number().positive().required(),
  mode: Joi.string().required(),
  status: Joi.string().valid("Passed", "Failed"),
  user: Joi.string(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports.valdFundSchema = Joi.object({
  user: Joi.string(),
  type: Joi.string().valid("Deposit", "Withdraw").required(),
  amount: Joi.number().positive().required(),
  createdAt: Joi.date()
});
