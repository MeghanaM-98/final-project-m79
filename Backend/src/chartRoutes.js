// src/chartRoutes.js
const express = require("express");
const pool = require("./database");
const authenticateToken = require("./middleware/authMiddleware");

const router = express.Router();

// GET /api/charts/summary-chart
// Returns global GenAI VC funding trend (EY numbers)
router.get("/summary-chart", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT period_label, year, funding_billion FROM ga_funding_trend ORDER BY year, id"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching summary chart data:", err);
    res.status(500).json({ message: "Error fetching summary chart data" });
  }
});

// GET /api/charts/reports-chart
// Returns GenAI VC investments by year (deal volume + value)
router.get("/reports-chart", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT year_label, deal_count, deal_value_billion FROM ga_investments ORDER BY year, id"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching reports chart data:", err);
    res.status(500).json({ message: "Error fetching reports chart data" });
  }
});

module.exports = router;
