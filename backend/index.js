const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Mock data
const buyers = require("./data/buyers");
const kendras = require("./data/kendras");

// Marketplace API - get buyers by crop and location (mock filter)
app.get("/api/buyers", (req, res) => {
  const { crop, location } = req.query;
  // Simple filter by crop substring match
  const filtered = buyers.filter(b =>
    crop ? b.crop.toLowerCase().includes(crop.toLowerCase()) : true
  );
  res.json(filtered);
});

// Weather API - mock weather data by location
app.get("/api/weather", (req, res) => {
  const { location } = req.query;
  res.json({
    temperature: "28°C",
    humidity: "65%",
    rainfall: "15mm expected",
    forecast: "Partly cloudy with chances of light rain",
    advisory: "Suitable for wheat cultivation. Irrigation not required for next 48 hours."
  });
});

// Soil Health API - mock analysis
app.post("/api/soil-health", (req, res) => {
  const { location, crop } = req.body;
  res.json({
    pH: "6.8 (Optimal)",
    nitrogen: "Medium",
    phosphorus: "High",
    potassium: "Low",
    recommendations: [
      "Add potassium-rich fertilizer",
      "Maintain current pH levels",
      "Consider crop rotation"
    ]
  });
});

// Disease Detection API - mock detection
app.post("/api/disease-detection", (req, res) => {
  // In real app, analyze image etc.
  res.json({
    disease: "Leaf Rust",
    confidence: "92%",
    description: "Fungal infection affecting wheat crops",
    remedies: [
      "Apply fungicide containing tebuconazole",
      "Remove and destroy infected leaves",
      "Ensure proper spacing for air circulation"
    ],
    preventive: [
      "Use resistant varieties",
      "Practice crop rotation",
      "Avoid overhead irrigation"
    ],
    krishiKendra: {
      name: "Krishi Vigyan Kendra Main",
      phone: "+91-9876543210"
    }
  });
});

// Local Resources API - list Krishi Kendras
app.get("/api/kendras", (req, res) => {
  res.json(kendras);
});

app.listen(port, () => {
  console.log(`Krishi Saathi backend running on http://localhost:${port}`);
});