const express = require("express");
const router = express.Router();
const dbService = require("../services/dbService");

router.get("/buyers", async (req, res) => {
  try {
    const { crop, location } = req.query;
    const buyers = await dbService.getBuyers(crop, location);
    res.json(buyers);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to fetch buyers" });
  }
});

module.exports = router;