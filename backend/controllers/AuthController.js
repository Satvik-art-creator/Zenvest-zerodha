const User = require("../models/UsersModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  buildVerificationLink,
  createVerificationTokenPair,
  sendVerificationEmail,
  RESEND_COOLDOWN_MS,
} = require("../utils/EmailVerification");
const { authCookieOptions, clearAuthCookieOptions } = require("../utils/CookieOptions");

// ────────────────────────────────────────────────────────────────────
//  SIGNUP
// ────────────────────────────────────────────────────────────────────
module.exports.Signup = async (req, res) => {
  try {
    const { name, username, number, email, password, createdAt } = req.body;

    // ── Validate required fields ──────────────────────────────────
    if (!name || !username || !number || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const [existingByEmail, existingByNumber, existingByUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ number }),
      User.findOne({ username }),
    ]);

    // ── Email already taken by a VERIFIED user ────────────────────
    if (existingByEmail && existingByEmail.isVerified) {
      return res.status(409).json({ success: false, message: "Email already registered. Please login." });
    }

    // ── Phone number belongs to a DIFFERENT user ──────────────────
    if (existingByNumber && (!existingByEmail || String(existingByNumber._id) !== String(existingByEmail._id))) {
      if (existingByNumber.isVerified) {
        return res.status(409).json({ success: false, message: "Phone number already registered." });
      }
    }

    // ── Username belongs to a DIFFERENT user ──────────────────────
    if (existingByUsername && (!existingByEmail || String(existingByUsername._id) !== String(existingByEmail._id))) {
      if (existingByUsername.isVerified) {
        return res.status(409).json({ success: false, message: "Username already taken. Please choose another." });
      }
    }

    const { token, hashedToken, expiresAt } = createVerificationTokenPair();
    const now = new Date();

    let user;
    if (existingByEmail && !existingByEmail.isVerified) {
      // Re-signup: update ALL fields so the user can correct mistakes
      existingByEmail.name = name;
      existingByEmail.username = username;
      existingByEmail.number = number;
      existingByEmail.password = password; // pre-save hook will hash
      existingByEmail.emailVerificationToken = hashedToken;
      existingByEmail.emailVerificationTokenExpiresAt = expiresAt;
      existingByEmail.lastVerificationEmailSentAt = now;
      user = await existingByEmail.save();
    } else {
      user = await User.create({
        name,
        username,
        number,
        email,
        password,
        createdAt,
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiresAt: expiresAt,
        lastVerificationEmailSentAt: now,
      });
    }

    const verificationLink = buildVerificationLink(token);
    const mailMeta = await sendVerificationEmail({
      to: user.email,
      username: user.username,
      verificationLink,
    });

    return res.status(201).json({
      success: true,
      requiresVerification: true,
      message: "Account created! Please check your email and verify within 10 minutes.",
      previewUrl: mailMeta.previewUrl || null,
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Mongoose duplicate-key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      const msg =
        field === "email"
          ? "Email already registered."
          : field === "username"
            ? "Username already taken."
            : field === "number"
              ? "Phone number already registered."
              : "Duplicate value detected.";
      return res.status(409).json({ success: false, message: msg });
    }

    return res.status(500).json({ success: false, message: "Signup failed. Please try again later." });
  }
};

// ────────────────────────────────────────────────────────────────────
//  LOGIN
// ────────────────────────────────────────────────────────────────────
module.exports.Login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User does not exist. Sign up first!" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        code: "EMAIL_NOT_VERIFIED",
        message: "Your email is not verified. Please verify before logging in.",
      });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ success: false, message: "Incorrect password. Please try again." });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, authCookieOptions);
    return res.status(200).json({ success: true, message: "Logged in successfully! Redirecting..." });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed. Please try again later." });
  }
};

// ────────────────────────────────────────────────────────────────────
//  LOGOUT
// ────────────────────────────────────────────────────────────────────
module.exports.Logout = (req, res) => {
  res.clearCookie("token", clearAuthCookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// ────────────────────────────────────────────────────────────────────
//  VERIFY EMAIL
// ────────────────────────────────────────────────────────────────────
module.exports.VerifyEmail = async (req, res) => {
  try {
    const token = req.query.token || req.body.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        code: "TOKEN_MISSING",
        message: "Verification token is missing.",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // First check if ANY user has this token (even expired)
    const userByToken = await User.findOne({ emailVerificationToken: hashedToken });

    if (!userByToken) {
      return res.status(400).json({
        success: false,
        code: "TOKEN_INVALID",
        message: "Verification link is invalid. Please request a new one.",
      });
    }

    // Already verified?
    if (userByToken.isVerified) {
      return res.status(200).json({
        success: true,
        code: "ALREADY_VERIFIED",
        message: "Your account is already verified. You can login now.",
      });
    }

    // Token expired?
    if (userByToken.emailVerificationTokenExpiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        code: "TOKEN_EXPIRED",
        message: "Verification link has expired. Please request a new one.",
        email: userByToken.email, // let frontend pre-fill the resend form
      });
    }

    // ── Token valid — verify the user ─────────────────────────────
    userByToken.isVerified = true;
    userByToken.emailVerifiedAt = new Date();
    userByToken.emailVerificationToken = null;
    userByToken.emailVerificationTokenExpiresAt = null;
    await userByToken.save();

    return res.status(200).json({
      success: true,
      code: "VERIFIED",
      message: "Email verified successfully! Redirecting to login...",
    });
  } catch (error) {
    console.error("VerifyEmail error:", error);
    return res.status(500).json({ success: false, message: "Email verification failed. Please try again." });
  }
};

// ────────────────────────────────────────────────────────────────────
//  RESEND VERIFICATION EMAIL
// ────────────────────────────────────────────────────────────────────
module.exports.ResendVerificationEmail = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ success: false, message: "Email or username is required." });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    // Intentionally vague for non-existent users (prevent user-enumeration)
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If this account exists, a verification email has been sent.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        code: "ALREADY_VERIFIED",
        message: "Account is already verified. Please login.",
      });
    }

    // ── Rate-limit: 1 email per RESEND_COOLDOWN_MS ────────────────
    if (user.lastVerificationEmailSentAt) {
      const elapsed = Date.now() - user.lastVerificationEmailSentAt.getTime();
      if (elapsed < RESEND_COOLDOWN_MS) {
        const waitSec = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
        return res.status(429).json({
          success: false,
          code: "RATE_LIMITED",
          message: `Please wait ${waitSec} second${waitSec > 1 ? "s" : ""} before requesting another email.`,
          retryAfterSeconds: waitSec,
        });
      }
    }

    const { token, hashedToken, expiresAt } = createVerificationTokenPair();
    const now = new Date();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationTokenExpiresAt = expiresAt;
    user.lastVerificationEmailSentAt = now;
    await user.save();

    const verificationLink = buildVerificationLink(token);
    const mailMeta = await sendVerificationEmail({
      to: user.email,
      username: user.username,
      verificationLink,
    });

    return res.status(200).json({
      success: true,
      message: "Verification email sent! Please check your inbox. The link expires in 10 minutes.",
      previewUrl: mailMeta.previewUrl || null,
    });
  } catch (error) {
    console.error("ResendVerification error:", error);
    return res.status(500).json({ success: false, message: "Could not send verification email. Please try again." });
  }
};