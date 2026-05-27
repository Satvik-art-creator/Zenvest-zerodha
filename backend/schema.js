const Joi = require("joi");

module.exports.valdUserSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.empty": "Full name is required.",
      "any.required": "Full name is required.",
    }),

  username: Joi.string()
    .alphanum()
    .pattern(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z][A-Za-z0-9]{3,14}$/)
    .min(4)
    .max(15)
    .required()
    .messages({
      "string.empty": "Username is required.",
      "any.required": "Username is required.",
      "string.alphanum": "Username can only contain letters and numbers — no special characters.",
      "string.min": "Username must be at least 4 characters long.",
      "string.max": "Username cannot be longer than 15 characters.",
      "string.pattern.base":
        "Username must start with a letter, be 4–15 characters long, and contain both letters and numbers (no special characters).",
    }),

  number: Joi.string()
    .length(10)
    .pattern(/^[1-9][0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
      "string.length": "Phone number must be exactly 10 digits.",
      "string.pattern.base": "Enter a valid 10-digit phone number (cannot start with 0).",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
      "string.email": "Please enter a valid email address.",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_#])[A-Za-z\d@_#]{8,}$/)
    .min(8)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character (@, _, or #). No other special characters are allowed.",
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
