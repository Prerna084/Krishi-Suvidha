const express = require("express");
const router = express.Router();

const advisoryService = require("../services/advisory");
const weatherService = require("../services/weatherService");
const soilHealthService = require("../services/soilHealthService");
const diseaseDetection = require("../services/diseaseDetection");

// POST /api/advisory
// Expects JSON body: { cropType, location, image (optional base64 or handled separately) }
router.post("/", async (req, res) => {
  try {
    const { cropType, location } = req.body;

    if (!cropType || !location) {
      return res.status(400).json({ error: "cropType and location are required" });
    }

    // Fetch weather data
    const weather = await weatherService.fetchWeather(location);

    // Fetch soil health data
    const soilHealth = await soilHealthService.analyzeSoil(location, cropType);

    // For disease detection, if you handle image upload differently, adjust accordingly
    // Here we assume no image or mock detection
    const disease = await diseaseDetection.detectDisease(cropType, null);

    // Generate advisory combining all data
    const advisory = advisoryService.generateAdvisory(weather, soilHealth, disease);

    res.json(advisory);
  } catch (error) {
    console.error("Advisory route error:", error);
    res.status(500).json({ error: "Failed to generate advisory" });
  }
});

module.exports = router;