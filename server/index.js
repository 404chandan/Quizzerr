const express = require("express");
const app = express();
require("dotenv").config();

const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// Connect to DB
database.connectToDB();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Default to frontend's origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 14400,
  })
);

// Base API endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Route handling
app.use("/api/v1/", routes);

// Activate server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
