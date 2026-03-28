const trimTrailingSlash = (url) => url.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
);

export const DASHBOARD_APP_URL = trimTrailingSlash(
  import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5174",
);
