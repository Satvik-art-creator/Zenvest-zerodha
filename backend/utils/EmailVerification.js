const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { getTransporter } = require("./Mailer");

// ── Token lifetime: 10 minutes ──────────────────────────────────────
const EMAIL_TOKEN_TTL_MS = 10 * 60 * 1000;

// ── Minimum gap between two verification emails (rate-limit) ────────
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds

const createVerificationTokenPair = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return {
    token,
    hashedToken,
    expiresAt: new Date(Date.now() + EMAIL_TOKEN_TTL_MS),
  };
};

const buildVerificationLink = (token) => {
  const frontendBaseUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
  return `${frontendBaseUrl}/verify-email?token=${token}`;
};

const sendVerificationEmail = async ({ to, username, verificationLink }) => {
  const transporter = await getTransporter();
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@zenvest.local";

  const info = await transporter.sendMail({
    from: `Zenvest <${fromAddress}>`,
    to,
    subject: "Verify your Zenvest account",
    text: `Hi ${username},\n\nVerify your email by clicking this link:\n${verificationLink}\n\nThis link will expire in 10 minutes.\n\nIf you did not sign up, please ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1d1d1d;">
        <h2 style="margin-bottom: 8px;">Welcome to Zenvest</h2>
        <p>Hi ${username},</p>
        <p>Please verify your email address to activate your account and access your dashboard.</p>
        <p style="margin: 20px 0;">
          <a href="${verificationLink}" style="background: #0f7bff; color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 4px; display: inline-block;">Verify Email</a>
        </p>
        <p>Or copy this URL into your browser:</p>
        <p>${verificationLink}</p>
        <p><strong>This link expires in 10 minutes.</strong></p>
        <p>If you did not sign up, you can safely ignore this email.</p>
      </div>
    `,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);

  return {
    previewUrl,
    messageId: info.messageId,
  };
};

module.exports = {
  EMAIL_TOKEN_TTL_MS,
  RESEND_COOLDOWN_MS,
  buildVerificationLink,
  createVerificationTokenPair,
  sendVerificationEmail,
};
