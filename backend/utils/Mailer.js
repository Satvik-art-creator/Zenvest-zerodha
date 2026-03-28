const nodemailer = require("nodemailer");

let cachedTransporter = null;

const parsePort = (value, fallback) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const getTransporter = async () => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    cachedTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parsePort(SMTP_PORT, 587),
      secure: parsePort(SMTP_PORT, 587) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    return cachedTransporter;
  }

  // Dev fallback for local testing without manual SMTP setup.
  const testAccount = await nodemailer.createTestAccount();
  cachedTransporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return cachedTransporter;
};

module.exports = {
  getTransporter,
};
