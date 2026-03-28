const isProduction = process.env.NODE_ENV === "production";

const cookieSecurityOptions = {
  httpOnly: isProduction,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
};

const authCookieOptions = {
  ...cookieSecurityOptions,
  maxAge: 24 * 60 * 60 * 1000,
};

module.exports = {
  authCookieOptions,
  clearAuthCookieOptions: cookieSecurityOptions,
};
