// src/index.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");
const chartRoutes = require("./chartRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/charts", chartRoutes);

app.get("/", (req, res) => {
  res.send("M79 backend is running");
  console.log("DB password:", process.env.DB_PASSWORD);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
