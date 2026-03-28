require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");

const PORT = process.env.PORT || 8080;

const AuthRouter = require("./routes/AuthRoute.js");
const getRouter = require("./routes/getRoutes.js");
const postRouter = require("./routes/postRoute.js");
const userRouter = require("./routes/userRoute.js");

const isProduction = process.env.NODE_ENV === "production";

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => origin.replace(/\/$/, ""));

const configuredOrigins = new Set(parseOrigins(process.env.CORS_ORIGINS || ""));

if (process.env.FRONTEND_URL) {
  configuredOrigins.add(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

if (!isProduction && configuredOrigins.size === 0) {
  configuredOrigins.add("http://localhost:5173");
  configuredOrigins.add("http://localhost:5174");
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow same-origin and non-browser requests (no Origin header).
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");
    if (configuredOrigins.has(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT, () => console.log(`App Started!!`));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

app.use("/", AuthRouter);
app.use("/", getRouter);
app.use("/", postRouter);
app.use("/", userRouter);

app.use((err, req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS origin denied",
    });
  }
  return next(err);
});

// ── 404 catch-all for unknown API routes ────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

