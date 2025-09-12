// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint
app.get("/weather", (req, res) => {
  const city = req.query.city || "Delhi";
  res.json({ city, temperature: 28 });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
