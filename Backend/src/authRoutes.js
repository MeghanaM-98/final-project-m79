// src/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("./database");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // check if user already exists
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // insert user
    await pool.query(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, passwordHash]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /register:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // get user from DB
    const [rows] = await pool.query(
      "SELECT id, username, password_hash FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // compare password with hash
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // issue JWT
    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
