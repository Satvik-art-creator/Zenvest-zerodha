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

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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

// ── 404 catch-all for unknown API routes ────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

