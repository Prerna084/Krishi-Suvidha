 // server/index.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Database setup
const db = new sqlite3.Database('./krishi_suvidha.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  const tables = [
    // Soil analysis table
    `CREATE TABLE IF NOT EXISTS soil_analysis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      crop_type TEXT,
      ph_level REAL,
      nitrogen TEXT,
      phosphorus TEXT,
      potassium TEXT,
      recommendations TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Weather data table
    `CREATE TABLE IF NOT EXISTS weather_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      temperature REAL,
      humidity REAL,
      rainfall REAL,
      wind_speed REAL,
      forecast TEXT,
      advisory TEXT,
      alerts TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Disease detection table
    `CREATE TABLE IF NOT EXISTS disease_detection (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      crop_type TEXT,
      image_path TEXT,
      disease_name TEXT,
      confidence REAL,
      description TEXT,
      remedies TEXT,
      preventive_measures TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Marketplace table
    `CREATE TABLE IF NOT EXISTS marketplace (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seller_location TEXT NOT NULL,
      crop_type TEXT,
      quantity REAL,
      price REAL,
      buyer_name TEXT,
      buyer_contact TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Water availability table
    `CREATE TABLE IF NOT EXISTS water_availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      water_source TEXT,
      availability_status TEXT,
      quality_rating TEXT,
      recommendations TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Livestock management table
    `CREATE TABLE IF NOT EXISTS livestock (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      farmer_location TEXT NOT NULL,
      animal_type TEXT,
      count INTEGER,
      health_status TEXT,
      vaccination_schedule TEXT,
      feed_recommendations TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Cold storage table
    `CREATE TABLE IF NOT EXISTS cold_storage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      facility_name TEXT,
      capacity REAL,
      available_space REAL,
      temperature_range TEXT,
      contact_info TEXT,
      pricing TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Transport sharing table
    `CREATE TABLE IF NOT EXISTS transport_sharing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_location TEXT NOT NULL,
      to_location TEXT NOT NULL,
      vehicle_type TEXT,
      capacity REAL,
      available_space REAL,
      price_per_km REAL,
      driver_contact TEXT,
      status TEXT DEFAULT 'available',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Feedback table
    `CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      farmer_location TEXT NOT NULL,
      service_type TEXT,
      rating INTEGER,
      comments TEXT,
      suggestions TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Volunteers table
    `CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      skills TEXT,
      availability TEXT,
      contact_info TEXT,
      experience TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Group farming table
    `CREATE TABLE IF NOT EXISTS group_farming (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_name TEXT NOT NULL,
      location TEXT,
      members_count INTEGER,
      crop_type TEXT,
      land_area REAL,
      coordinator_contact TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  tables.forEach(table => {
    db.run(table, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes

// 1. Soil Detection API
app.post('/api/soil-analysis', (req, res) => {
  const { location, cropType, pH, nitrogen, phosphorus, potassium } = req.body;
  
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  let recommendations = [];
  
  // pH analysis
  const phLevel = parseFloat(pH) || 0;
  if (phLevel < 6.0) {
    recommendations.push("Soil is acidic. Apply lime at 2 tons per acre.");
  } else if (phLevel > 7.5) {
    recommendations.push("Soil is alkaline. Add organic matter and sulfur.");
  } else {
    recommendations.push("Soil pH is optimal for most crops.");
  }

  // Nutrient analysis
  if (nitrogen === "low") {
    recommendations.push("Apply nitrogen-rich fertilizer (Urea: 50kg/acre)");
  }
  if (phosphorus === "low") {
    recommendations.push("Apply phosphorus-rich fertilizer (DAP: 50kg/acre)");
  }
  if (potassium === "low") {
    recommendations.push("Apply potassium-rich fertilizer (MOP: 25kg/acre)");
  }

  const recommendationsText = recommendations.join('; ');
  
  // Save to database
  db.run(
    `INSERT INTO soil_analysis (location, crop_type, ph_level, nitrogen, phosphorus, potassium, recommendations) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [location, cropType, phLevel, nitrogen, phosphorus, potassium, recommendationsText],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        id: this.lastID,
        analysis: {
          pH: phLevel,
          nitrogen,
          phosphorus,
          potassium
        },
        recommendations,
        soilHealth: phLevel >= 6.0 && phLevel <= 7.5 ? "Good" : "Needs Improvement"
      });
    }
  );
});

// 2. Enhanced Weather Detection API
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;
  
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    // Simulate weather API call (replace with real API in production)
    const weatherData = {
      location,
      temperature: Math.round(Math.random() * 15 + 20), // 20-35°C
      humidity: Math.round(Math.random() * 40 + 40), // 40-80%
      rainfall: Math.round(Math.random() * 20), // 0-20mm
      windSpeed: Math.round(Math.random() * 15 + 5), // 5-20 km/h
      forecast: "Partly cloudy with chances of light rain",
      advisory: "Suitable for wheat cultivation. Irrigation not required for next 48 hours.",
      alerts: Math.random() > 0.5 ? ["Light rain expected in 24 hours"] : []
    };

    // Save to database
    db.run(
      `INSERT INTO weather_data (location, temperature, humidity, rainfall, wind_speed, forecast, advisory, alerts) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [location, weatherData.temperature, weatherData.humidity, weatherData.rainfall, 
       weatherData.windSpeed, weatherData.forecast, weatherData.advisory, JSON.stringify(weatherData.alerts)],
      function(err) {
        if (err) {
          console.error('Database error:', err);
        }
      }
    );

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Weather service unavailable' });
  }
});

// 3. Water Availability API
app.get('/api/water-availability', (req, res) => {
  const { location } = req.query;
  
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const waterData = {
    location,
    sources: [
      { type: "Groundwater", availability: "Good", depth: "15 feet", quality: "Suitable for irrigation" },
      { type: "Canal Water", availability: "Seasonal", schedule: "Available Mon-Wed-Fri", quality: "Good" },
      { type: "Rainwater Harvesting", potential: "High", recommendation: "Install 5000L tank" }
    ],
    overallStatus: "Adequate",
    recommendations: [
      "Install drip irrigation to conserve water",
      "Consider rainwater harvesting during monsoon",
      "Test groundwater quality quarterly"
    ]
  };

  // Save to database
  db.run(
    `INSERT INTO water_availability (location, water_source, availability_status, quality_rating, recommendations) 
     VALUES (?, ?, ?, ?, ?)`,
    [location, JSON.stringify(waterData.sources), waterData.overallStatus, "Good", JSON.stringify(waterData.recommendations)],
    function(err) {
      if (err) {
        console.error('Database error:', err);
      }
    }
  );

  res.json(waterData);
});

 // 4. Crop Advice API (Smart, data-driven)
app.post('/api/crop-advice', async (req, res) => {
  const { location, soilType, season, currentCrop } = req.body;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  // Helper to fetch latest row for a location
  const dbGet = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
    });

  try {
    // Fetch latest context if available
    const soilRow = await dbGet(
      `SELECT ph_level, nitrogen, phosphorus, potassium
         FROM soil_analysis
        WHERE location LIKE ?
        ORDER BY id DESC
        LIMIT 1`,
      [`%${location}%`]
    ).catch(() => null);

    const weatherRow = await dbGet(
      `SELECT temperature, humidity, rainfall, wind_speed, advisory
         FROM weather_data
        WHERE location LIKE ?
        ORDER BY id DESC
        LIMIT 1`,
      [`%${location}%`]
    ).catch(() => null);

    const waterRow = await dbGet(
      `SELECT availability_status
         FROM water_availability
        WHERE location LIKE ?
        ORDER BY id DESC
        LIMIT 1`,
      [`%${location}%`]
    ).catch(() => null);

    // Basic market signals (mirror of market-prices route trends)
    const marketTrends = {
      wheat: 'up',
      rice: 'stable',
      mustard: 'down',
      gram: 'up',
      corn: 'stable'
    };

    // Candidate crop library with simple agro-ecological parameters
    const CANDIDATES = [
      {
        name: 'Wheat',
        season: 'Rabi',
        soil: ['loamy', 'clay'],
        waterNeed: 'Medium',
        expectedYield: '40-45 quintals/hectare',
        tempRange: [10, 25],
        rainfallRange: [0, 80],
        marketKey: 'wheat',
        inputs: ['Certified seed', 'DAP/Urea', 'Timely irrigation']
      },
      {
        name: 'Rice',
        season: 'Kharif',
        soil: ['clay', 'silty'],
        waterNeed: 'High',
        expectedYield: '50-60 quintals/hectare',
        tempRange: [20, 35],
        rainfallRange: [100, 300],
        marketKey: 'rice',
        inputs: ['Paddy seedlings', 'FYM', 'Standing water management']
      },
      {
        name: 'Mustard',
        season: 'Rabi',
        soil: ['loamy', 'sandy'],
        waterNeed: 'Low',
        expectedYield: '12-20 quintals/hectare',
        tempRange: [10, 25],
        rainfallRange: [20, 60],
        marketKey: 'mustard',
        inputs: ['Quality seed', 'Basal fertilizer', 'One irrigation']
      },
      {
        name: 'Gram',
        season: 'Rabi',
        soil: ['sandy', 'loamy'],
        waterNeed: 'Low',
        expectedYield: '15-20 quintals/hectare',
        tempRange: [15, 25],
        rainfallRange: [20, 60],
        marketKey: 'gram',
        inputs: ['Seed inoculation', 'Low irrigation', 'Weed control']
      },
      {
        name: 'Maize',
        season: 'Kharif',
        soil: ['loamy', 'silty'],
        waterNeed: 'Medium',
        expectedYield: '30-40 quintals/hectare',
        tempRange: [20, 30],
        rainfallRange: [50, 150],
        marketKey: 'corn',
        inputs: ['Fertilizer management', '2-3 irrigations', 'Pest monitoring']
      }
    ];

    const clamp = (x, min, max) => Math.max(min, Math.min(max, x));

    const recommendations = CANDIDATES.map((crop) => {
      let score = 50;
      const rationale = [];

      // Soil type preference
      if (soilType) {
        if (crop.soil.includes(String(soilType).toLowerCase())) {
          score += 10;
          rationale.push(`Matches soil type: ${soilType}`);
        } else {
          score -= 5;
          rationale.push(`Less suitable for soil type: ${soilType}`);
        }
      }

      // Season preference
      if (season) {
        if (String(season).toLowerCase() === String(crop.season).toLowerCase()) {
          score += 10;
          rationale.push(`In-season crop (${crop.season})`);
        } else {
          score -= 5;
          rationale.push(`Out-of-season vs preferred ${crop.season}`);
        }
      }

      // Soil analysis factors
      if (soilRow && typeof soilRow.ph_level === 'number') {
        const pH = soilRow.ph_level;
        if (pH >= 6.0 && pH <= 7.5) {
          score += 5;
          rationale.push('Optimal pH (6.0–7.5)');
        } else if (pH < 6.0) {
          if (crop.name === 'Rice') {
            score += 3;
            rationale.push('Acidic soil tolerable for rice');
          } else {
            score -= 4;
            rationale.push('Acidic soil: apply lime and prefer tolerant crops');
          }
        } else if (pH > 7.5) {
          if (crop.name === 'Mustard' || crop.name === 'Gram') {
            score += 3;
            rationale.push('Slightly alkaline soil okay for mustard/gram');
          } else {
            score -= 4;
            rationale.push('Alkaline soil: add organic matter/sulfur');
          }
        }
      }
      if (soilRow && soilRow.nitrogen && String(soilRow.nitrogen).toLowerCase() === 'low') {
        if (crop.name === 'Gram') {
          score += 6;
          rationale.push('Low nitrogen: prefer legumes like gram');
        } else {
          score -= 2;
          rationale.push('Low nitrogen may reduce yield');
        }
      }

      // Weather suitability
      if (weatherRow) {
        const t = typeof weatherRow.temperature === 'number' ? weatherRow.temperature : null;
        const r = typeof weatherRow.rainfall === 'number' ? weatherRow.rainfall : null;

        if (t !== null) {
          if (t >= crop.tempRange[0] && t <= crop.tempRange[1]) {
            score += 8;
            rationale.push(`Temperature suitable (${t}°C)`);
          } else {
            score -= 5;
            rationale.push(`Temperature suboptimal (${t}°C)`);
          }
        }

        if (r !== null) {
          if (r >= crop.rainfallRange[0] && r <= crop.rainfallRange[1]) {
            score += 8;
            rationale.push(`Rainfall suitable (${r} mm)`);
          } else if (r < crop.rainfallRange[0]) {
            if (crop.waterNeed === 'Low') {
              score += 2;
              rationale.push('Low rainfall but crop is low water-need');
            } else {
              score -= 6;
              rationale.push('Low rainfall vs higher water need');
            }
          } else {
            // Higher than range
            score -= 3;
            rationale.push('High rainfall may increase disease risk');
          }
        }
      }

      // Water availability status
      if (waterRow && waterRow.availability_status) {
        const status = String(waterRow.availability_status).toLowerCase();
        if (status.includes('adequate') || status.includes('good')) {
          score += 5;
          rationale.push('Adequate water availability');
        } else if (status.includes('poor') || status.includes('low')) {
          if (crop.waterNeed === 'High') {
            score -= 10;
            rationale.push('Poor water availability vs high water need');
          } else if (crop.waterNeed === 'Low') {
            score += 5;
            rationale.push('Poor water availability favors low water-need crops');
          } else {
            score -= 4;
            rationale.push('Limited water may constrain yield');
          }
        }
      }

      // Market signal
      const trend = marketTrends[crop.marketKey] || 'stable';
      if (trend === 'up') {
        score += 5;
        rationale.push('Market trend: rising prices');
      } else if (trend === 'down') {
        score -= 5;
        rationale.push('Market trend: falling prices');
      } else {
        rationale.push('Market trend: stable');
      }

      // Encourage rotation if same current crop is selected
      if (currentCrop && String(currentCrop).toLowerCase() === crop.name.toLowerCase()) {
        score -= 3;
        rationale.push('Promote crop rotation: slightly penalized current crop');
      }

      const suitabilityScore = clamp(Math.round(score), 0, 100);
      const suitability = suitabilityScore >= 75 ? 'High' : suitabilityScore >= 55 ? 'Medium' : 'Low';
      const risk =
        (crop.waterNeed === 'High' && waterRow && String(waterRow.availability_status || '').toLowerCase().includes('poor'))
          ? 'High'
          : (suitability === 'Low' ? 'Medium' : 'Low');

      const sowingWindow = crop.season === 'Kharif' ? 'June–July' : 'Oct–Nov';

      return {
        name: crop.name,
        suitability,
        suitabilityScore,
        expectedYield: crop.expectedYield,
        season: crop.season,
        waterNeed: crop.waterNeed,
        risk,
        marketSignal: trend,
        rationale,
        sowingWindow,
        inputs: crop.inputs
      };
    })
      .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
      .slice(0, 5);

    // Diversification based on top pick
    const top = recommendations[0];
    const diversificationOptions = top
      ? [
          `Intercrop ${top.name} with a short-duration legume (e.g., Cowpea/Gram)`,
          `Rotate ${top.name} next season with a contrasting crop to improve soil health`,
          'Adopt kitchen/vegetable garden for additional income',
          'Consider small area for high-margin horticulture if water allows'
        ]
      : [
          'Intercropping cereals with legumes to improve nitrogen',
          'Adopt crop rotation to break pest cycles',
          'Pilot a small area for high-value vegetables'
        ];

    // Seasonal tips enhanced by weather/soil
    const seasonalTips = [];
    if (weatherRow && weatherRow.advisory) {
      seasonalTips.push(weatherRow.advisory);
    }
    if (soilRow && typeof soilRow.ph_level === 'number') {
      const pH = soilRow.ph_level;
      if (pH < 6.0) seasonalTips.push('Soil acidic: Apply lime (2 t/acre) before sowing');
      if (pH > 7.5) seasonalTips.push('Soil alkaline: Add organic matter/FYM and elemental sulfur');
    }
    seasonalTips.push('Use certified seeds and treat seeds before sowing');
    seasonalTips.push('Plan irrigation based on 3–5 day weather forecast');

    const response = {
      recommendedCrops: recommendations,
      diversificationOptions,
      seasonalTips,
      diagnostics: {
        location,
        soil: soilRow || null,
        weather: weatherRow || null,
        water: waterRow || null,
        market: marketTrends
      }
    };

    res.json(response);
  } catch (err) {
    console.error('crop-advice error:', err);
    res.status(500).json({ error: 'Failed to generate crop advice' });
  }
});

// 5. Crop Diversification API
app.get('/api/crop-diversification', (req, res) => {
  const { location, currentCrops } = req.query;
  
  const diversificationPlan = {
    alternativeCrops: [
      { name: "Quinoa", marketDemand: "High", profitMargin: "300%", growthPeriod: "4 months" },
      { name: "Organic Vegetables", marketDemand: "Very High", profitMargin: "250%", growthPeriod: "2-3 months" },
      { name: "Medicinal Plants", marketDemand: "High", profitMargin: "400%", growthPeriod: "6-12 months" }
    ],
    valueAddition: [
      "Food processing unit setup",
      "Direct marketing to consumers",
      "Organic certification benefits"
    ],
    governmentSchemes: [
      "PM-KISAN scheme support",
      "Crop diversification subsidy",
      "Market linkage programs"
    ]
  };

  res.json(diversificationPlan);
});

// 6. Disease/Pest Alerts API
app.get('/api/disease-alerts', (req, res) => {
  const { location, cropType } = req.query;
  
  const alerts = {
    currentAlerts: [
      {
        disease: "Leaf Rust",
        severity: "Medium",
        affectedCrops: ["Wheat"],
        symptoms: "Orange-brown pustules on leaves",
        action: "Apply fungicide immediately",
        preventive: "Use resistant varieties"
      },
      {
        pest: "Aphids",
        severity: "Low",
        affectedCrops: ["Mustard", "Pea"],
        symptoms: "Small green insects on leaves",
        action: "Spray neem oil solution",
        preventive: "Maintain field hygiene"
      }
    ],
    seasonalForecast: [
      "Late blight expected in potato crops next month",
      "Bollworm attack likely in cotton during flowering"
    ],
    preventiveMeasures: [
      "Regular field monitoring",
      "Crop rotation practices",
      "Use of bio-pesticides"
    ]
  };

  res.json(alerts);
});

// 7. Quality Monitoring API
app.post('/api/quality-monitoring', (req, res) => {
  const { location, cropType, harvestDate, qualityParameters } = req.body;
  
  const qualityReport = {
    overallGrade: "A",
    parameters: {
      moisture: "12%",
      protein: "11.5%",
      foreignMatter: "1.2%",
      damagedGrains: "2%"
    },
    marketPrice: {
      grade_A: "₹2,500/quintal",
      grade_B: "₹2,300/quintal",
      grade_C: "₹2,100/quintal"
    },
    recommendations: [
      "Crop is ready for premium market",
      "Store in moisture-free environment",
      "Consider direct selling to mills"
    ],
    certificationEligible: true
  };

  res.json(qualityReport);
});

// 8. Livestock Management API
app.post('/api/livestock', (req, res) => {
  const { location, animalType, count, healthConcerns } = req.body;
  
  const livestockAdvice = {
    healthSchedule: {
      vaccination: "Next due: FMD vaccine in 2 weeks",
      deworming: "Due in 1 month",
      healthCheckup: "Monthly vet visit recommended"
    },
    feedRecommendations: [
      "Green fodder: 40kg/day per animal",
      "Dry fodder: 8kg/day per animal",
      "Concentrate: 2kg/day per animal"
    ],
    breeding: {
      nextCycle: "Expected in 3 months",
      recommendations: "Use AI services for better genetics"
    },
    economicBenefits: [
      "Milk production: ₹300/day per animal",
      "Organic manure: ₹50/day value",
      "Biogas potential: 2-3 cubic meters/day"
    ]
  };

  // Save to database
  db.run(
    `INSERT INTO livestock (farmer_location, animal_type, count, health_status, vaccination_schedule, feed_recommendations) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [location, animalType, count, "Good", JSON.stringify(livestockAdvice.healthSchedule), JSON.stringify(livestockAdvice.feedRecommendations)],
    function(err) {
      if (err) {
        console.error('Database error:', err);
      }
    }
  );

  res.json(livestockAdvice);
});

// 9. Modern Technologies/Demonstrations API
app.get('/api/demonstrations', (req, res) => {
  const { location } = req.query;
  
  const demonstrations = {
    upcomingEvents: [
      {
        title: "Drone Spraying Demonstration",
        date: "2024-02-15",
        location: "Krishi Vigyan Kendra",
        description: "Learn about precision agriculture using drones",
        registration: "Free, call +91-9876543210"
      },
      {
        title: "Organic Farming Workshop",
        date: "2024-02-20",
        location: "Community Center",
        description: "Hands-on training for organic certification",
        registration: "₹100, limited seats"
      }
    ],
    videos: [
      {
        title: "Modern Irrigation Techniques",
        duration: "15 minutes",
        language: "Hindi",
        url: "/videos/irrigation-hindi.mp4"
      },
      {
        title: "Soil Health Management",
        duration: "20 minutes",
        language: "Hindi",
        url: "/videos/soil-health-hindi.mp4"
      }
    ],
    technologies: [
      {
        name: "Precision Agriculture",
        benefits: "30% water saving, 25% yield increase",
        cost: "₹50,000 initial investment",
        subsidy: "50% government subsidy available"
      }
    ]
  };

  res.json(demonstrations);
});

// 10. Vermicompost Process API
app.get('/api/vermicompost', (req, res) => {
  const vermicompostGuide = {
    process: [
      {
        step: 1,
        title: "Preparation",
        description: "Collect organic waste (kitchen scraps, farm waste)",
        duration: "1 day",
        materials: ["Organic waste", "Earthworms", "Container"]
      },
      {
        step: 2,
        title: "Setup",
        description: "Layer organic matter in container with earthworms",
        duration: "1 day",
        tips: "Maintain moisture at 60-70%"
      },
      {
        step: 3,
        title: "Composting",
        description: "Let earthworms process the organic matter",
        duration: "45-60 days",
        maintenance: "Turn weekly, maintain moisture"
      },
      {
        step: 4,
        title: "Harvesting",
        description: "Separate compost from earthworms",
        duration: "1 day",
        yield: "50% of input weight as compost"
      }
    ],
    benefits: [
      "Rich in NPK nutrients",
      "Improves soil structure",
      "Increases water retention",
      "Reduces chemical fertilizer need by 50%"
    ],
    economicValue: {
      productionCost: "₹5/kg",
      marketPrice: "₹15-20/kg",
      profitMargin: "200-300%"
    }
  };

  res.json(vermicompostGuide);
});

// 11. Drone Organic Pesticides API
app.post('/api/drone-services', (req, res) => {
  const { location, cropType, area, pestType } = req.body;
  
  const droneService = {
    availableServices: [
      {
        service: "Organic Pesticide Spraying",
        coverage: "10 acres/hour",
        cost: "₹500/acre",
        chemicals: ["Neem oil", "Bacillus thuringiensis", "Trichoderma"]
      },
      {
        service: "Fertilizer Application",
        coverage: "15 acres/hour",
        cost: "₹300/acre",
        types: ["Liquid fertilizer", "Micronutrients"]
      }
    ],
    booking: {
      nextAvailable: "2024-02-10",
      duration: "2-3 hours for 20 acres",
      requirements: "Clear weather, wind speed < 10 km/h"
    },
    benefits: [
      "Precise application reduces chemical usage by 30%",
      "Uniform coverage ensures better pest control",
      "Reduces labor cost by 70%",
      "Environmentally friendly organic options"
    ]
  };

  res.json(droneService);
});

// 12. Disease Detection API (Enhanced)
app.post('/api/disease-detection', upload.single('image'), (req, res) => {
  const { location, cropType } = req.body;
  const imagePath = req.file ? req.file.path : null;
  
  if (!imagePath) {
    return res.status(400).json({ error: 'Image is required for disease detection' });
  }

  // Simulate AI disease detection (replace with actual AI model in production)
  const mockResults = {
    disease: "Leaf Rust",
    confidence: "92%",
    description: "Fungal infection affecting wheat crops. Appears as orange-brown pustules on leaves.",
    remedies: [
      "Apply fungicide containing tebuconazole (1ml/liter water)",
      "Remove and destroy infected leaves",
      "Ensure proper spacing (30cm between plants) for air circulation",
      "Avoid overhead irrigation to reduce humidity"
    ],
    preventive: [
      "Use resistant varieties (HD2967, DBW17)",
      "Practice crop rotation with legumes",
      "Maintain field sanitation",
      "Apply neem-based biopesticides as preventive spray"
    ],
    krishiKendra: {
      name: "Krishi Vigyan Kendra Main",
      phone: "+91-9876543210",
      distance: "12km",
      address: "Near Block Office, Main Road"
    }
  };

  // Save to database
  db.run(
    `INSERT INTO disease_detection (location, crop_type, image_path, disease_name, confidence, description, remedies, preventive_measures) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [location, cropType, imagePath, mockResults.disease, parseFloat(mockResults.confidence), 
     mockResults.description, JSON.stringify(mockResults.remedies), JSON.stringify(mockResults.preventive)],
    function(err) {
      if (err) {
        console.error('Database error:', err);
      }
    }
  );

  res.json(mockResults);
});

// 13. Krishi Kendra Contact API
app.get('/api/krishi-kendra', (req, res) => {
  const { location } = req.query;
  
  const krishiKendras = {
    nearest: [
      {
        name: "Krishi Vigyan Kendra Main",
        distance: "12km",
        phone: "+91-9876543210",
        address: "Near Block Office, Main Road",
        services: ["Soil testing", "Seed distribution", "Training programs"],
        timings: "9:00 AM - 5:00 PM",
        specialization: "Wheat, Rice, Vegetables"
      },
      {
        name: "Agricultural Extension Center",
        distance: "18km",
        phone: "+91-9876543211",
        address: "District Headquarters",
        services: ["Crop advisory", "Pest management", "Market linkage"],
        timings: "8:00 AM - 4:00 PM",
        specialization: "Organic farming, Horticulture"
      }
    ],
    emergencyContacts: [
      { service: "Crop Disease Helpline", phone: "1800-180-1551" },
      { service: "Weather Advisory", phone: "1800-180-1552" },
      { service: "Market Price Info", phone: "1800-180-1553" }
    ]
  };

  res.json(krishiKendras);
});

/**
 * 14. Government Schemes API (Enhanced)
 * Supports filtering by state, category, and search query with basic pagination.
 * Query params:
 *  - state (default: Punjab)
 *  - category (optional; matches scheme.category array/string)
 *  - q (optional; searches name/description/benefits/eligibility/department)
 *  - page (default 1), pageSize (default 20)
 */
app.get('/api/government-schemes', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'schemes.json');
    if (!fs.existsSync(dataPath)) {
      return res.status(500).json({ error: 'Schemes dataset not found' });
    }
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const payload = JSON.parse(raw);

    const {
      state = 'Punjab',
      category,
      q,
      page = '1',
      pageSize = '20'
    } = req.query;

    const pg = Math.max(parseInt(String(page), 10) || 1, 1);
    const ps = Math.min(Math.max(parseInt(String(pageSize), 10) || 20, 1), 100);

    const central = Array.isArray(payload.central) ? payload.central : [];
    const stateMap = payload.states && typeof payload.states === 'object' ? payload.states : {};
    const stateSchemes = Array.isArray(stateMap[state]) ? stateMap[state] : [];

    const normalizeCategory = (c) => {
      if (!c) return undefined;
      return String(c).toLowerCase().trim();
    };
    const cat = normalizeCategory(category);

    const matchesCategory = (scheme) => {
      if (!cat) return true;
      const sc = scheme.category;
      if (!sc) return false;
      if (Array.isArray(sc)) {
        return sc.some((x) => String(x).toLowerCase().includes(cat));
      }
      return String(sc).toLowerCase().includes(cat);
    };

    const matchesQuery = (scheme) => {
      if (!q) return true;
      const needle = String(q).toLowerCase();
      const hay = [
        scheme.name,
        scheme.description,
        Array.isArray(scheme.benefits) ? scheme.benefits.join(' ') : scheme.benefits,
        scheme.eligibility,
        scheme.department
      ]
        .filter(Boolean)
        .map((x) => String(x).toLowerCase())
        .join(' ');
      return hay.includes(needle);
    };

    const filterList = (list) => list.filter((s) => matchesCategory(s) && matchesQuery(s));

    const filteredCentral = filterList(central);
    const filteredState = filterList(stateSchemes);

    const total = { central: filteredCentral.length, state: filteredState.length };

    const paginate = (list) => {
      const start = (pg - 1) * ps;
      return list.slice(start, start + ps);
    };

    const centralSchemes = paginate(filteredCentral);
    const stateSchemesPaged = paginate(filteredState);

    res.json({
      state,
      category: category || null,
      q: q || null,
      page: pg,
      pageSize: ps,
      totals: total,
      centralSchemes,
      stateSchemes: stateSchemesPaged,
      notes: payload.metadata?.notes || "Data is indicative. Please verify from official portals."
    });
  } catch (err) {
    console.error('government-schemes error:', err);
    res.status(500).json({ error: 'Failed to load schemes' });
  }
});

// 15. Cold Storage Chain API
app.get('/api/cold-storage', (req, res) => {
  const { location, cropType, quantity } = req.query;
  
  const coldStorageOptions = {
    nearbyFacilities: [
      {
        name: "AgroFresh Cold Storage",
        distance: "25km",
        capacity: "500 tons",
        availableSpace: "150 tons",
        temperatureRange: "2-4°C",
        pricing: "₹2/kg/month",
        contact: "+91-9876543220",
        specialization: ["Vegetables", "Fruits"],
        facilities: ["Pre-cooling", "Packaging", "Transportation"]
      },
      {
        name: "Farmers Cold Chain Hub",
        distance: "35km",
        capacity: "1000 tons",
        availableSpace: "300 tons",
        temperatureRange: "0-8°C",
        pricing: "₹1.5/kg/month",
        contact: "+91-9876543221",
        specialization: ["Grains", "Pulses", "Vegetables"],
        facilities: ["Controlled atmosphere", "Quality testing", "Market linkage"]
      }
    ],
    pppModel: {
      description: "Public-Private Partnership for cold storage development",
      benefits: [
        "50% government subsidy on setup cost",
        "Low-interest loans available",
        "Technical support from agricultural universities",
        "Guaranteed minimum utilization by government procurement"
      ],
      investmentRequired: "₹50 lakhs for 100-ton capacity",
      roi: "15-20% annually",
      contactForDetails: "+91-1800-180-1560"
    }
  };

  res.json(coldStorageOptions);
});

// 16. E-mandis API
app.get('/api/e-mandis', (req, res) => {
  const { location, cropType } = req.query;
  
  const eMandiData = {
    nearestMandis: [
      {
        name: "Digital Mandi Center",
        distance: "15km",
        operatingHours: "6:00 AM - 6:00 PM",
        contact: "+91-9876543230",
        services: ["Online bidding", "Quality testing", "Payment gateway"],
        currentPrices: {
          wheat: "₹2,450/quintal",
          rice: "₹3,200/quintal",
          mustard: "₹5,800/quintal"
        }
      }
    ],
    onlineMarketplace: {
      platforms: [
        { name: "eNAM", url: "https://enam.gov.in", commission: "1%" },
        { name: "AgriMarket", url: "https://agrimarket.in", commission: "2%" },
        { name: "FarmFresh Direct", url: "https://farmfresh.in", commission: "1.5%" }
      ],
      benefits: [
        "Better price discovery",
        "Reduced intermediaries",
        "Direct payment to farmers",
        "Quality-based pricing"
      ]
    },
    priceComparison: {
      traditional: "₹2,300/quintal",
      eMandi: "₹2,450/quintal",
      savings: "₹150/quintal (6.5% more)"
    }
  };

  res.json(eMandiData);
});

// 17. Transport Sharing API
app.post('/api/transport', (req, res) => {
  const { fromLocation, toLocation, cropType, quantity, date } = req.body;
  
  const transportOptions = {
    availableVehicles: [
      {
        id: 1,
        vehicleType: "Truck (10 tons)",
        driver: "Rajesh Kumar",
        contact: "+91-9876543240",
        pricePerKm: "₹15/km",
        availableSpace: "7 tons",
        route: `${fromLocation} to ${toLocation}`,
        departureTime: "6:00 AM",
        estimatedCost: "₹4,500"
      },
      {
        id: 2,
        vehicleType: "Mini Truck (3 tons)",
        driver: "Suresh Singh",
        contact: "+91-9876543241",
        pricePerKm: "₹12/km",
        availableSpace: "2 tons",
        route: `${fromLocation} to ${toLocation}`,
        departureTime: "8:00 AM",
        estimatedCost: "₹3,600"
      }
    ],
    sharedTransport: {
      description: "Share transport costs with other farmers",
      benefits: [
        "Reduce individual transport cost by 40-60%",
        "Regular scheduled trips",
        "Insurance coverage included",
        "GPS tracking for security"
      ],
      groupBooking: {
        minimumQuantity: "5 tons",
        discount: "25% off individual rates",
        coordinatorContact: "+91-9876543250"
      }
    }
  };

  // Save to database
  db.run(
    `INSERT INTO transport_sharing (from_location, to_location, vehicle_type, capacity, available_space, price_per_km, driver_contact) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [fromLocation, toLocation, "Mixed", 10, 7, 15, "+91-9876543240"],
    function(err) {
      if (err) {
        console.error('Database error:', err);
      }
    }
  );

  res.json(transportOptions);
});

// 18. Feedback System API
app.post('/api/feedback', (req, res) => {
  const { location, serviceType, rating, comments, suggestions } = req.body;
  
  if (!location || !serviceType || !rating) {
    return res.status(400).json({ error: 'Location, service type, and rating are required' });
  }

  // Save to database
  db.run(
    `INSERT INTO feedback (farmer_location, service_type, rating, comments, suggestions) 
     VALUES (?, ?, ?, ?, ?)`,
    [location, serviceType, rating, comments, suggestions],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        id: this.lastID,
        message: "Thank you for your feedback!",
        followUp: rating < 3 ? "Our team will contact you within 24 hours" : "We appreciate your positive feedback"
      });
    }
  );
});

// 19. SMS/USSD Support API
app.post('/api/sms-support', (req, res) => {
  const { phoneNumber, service, language } = req.body;
  
  const smsServices = {
    availableServices: [
      { code: "*123*1#", service: "Weather Updates", description: "Daily weather forecast" },
      { code: "*123*2#", service: "Market Prices", description: "Current crop prices" },
      { code: "*123*3#", service: "Disease Alerts", description: "Pest and disease warnings" },
      { code: "*123*4#", service: "Government Schemes", description: "Scheme information and status" }
    ],
    languages: ["Hindi", "English", "Punjabi", "Gujarati", "Marathi"],
    instructions: {
      hindi: "अपने फोन से *123# डायल करें और सेवा चुनें",
      english: "Dial *123# from your phone and select service",
      charges: "₹1 per query (deducted from main balance)"
    },
    helpline: "1800-180-1570 (Toll-free)"
  };

  res.json(smsServices);
});

// 20. AI Chatbot API
app.post('/api/chatbot', (req, res) => {
  const { message, language, context } = req.body;
  
  // Simple rule-based responses (replace with actual AI in production)
  const responses = {
    "weather": "आज का मौसम साफ है। तापमान 28°C है। सिंचाई की जरूरत नहीं।",
    "soil": "मिट्टी की जांच के लिए नजदीकी कृषि केंद्र से संपर्क करें। pH 6-7 बेहतर है।",
    "disease": "पत्तियों पर धब्बे दिख रहे हैं? तस्वीर भेजें, हम बीमारी की पहचान करेंगे।",
    "price": "गेहूं का आज का भाव ₹2,450 प्रति क्विंटल है। कल तक यही रहेगा।",
    "scheme": "PM-KISAN के लिए आधार और बैंक डिटेल चाहिए। ऑनलाइन अप्लाई करें।"
  };

  const query = message.toLowerCase();
  let response = "मुझे समझ नहीं आया। कृपया स्पष्ट करें या हेल्पलाइन 1800-180-1570 पर कॉल करें।";

  for (const [key, value] of Object.entries(responses)) {
    if (query.includes(key) || query.includes(key.replace(/[aeiou]/g, ''))) {
      response = value;
      break;
    }
  }

  res.json({
    response,
    suggestions: [
      "मौसम की जानकारी",
      "मिट्टी की जांच",
      "बीमारी की पहचान",
      "बाजार भाव",
      "सरकारी योजना"
    ],
    helpOptions: [
      { text: "विशेषज्ञ से बात करें", action: "call:1800-180-1570" },
      { text: "वीडियो देखें", action: "videos" },
      { text: "नजदीकी केंद्र", action: "krishi-kendra" }
    ]
  });
});

// 21. Market Price Tracking API
app.get('/api/market-prices', (req, res) => {
  const { location, cropType, language } = req.query;
  
  const marketData = {
    currentPrices: {
      wheat: { price: "₹2,450", trend: "up", change: "+₹50" },
      rice: { price: "₹3,200", trend: "stable", change: "₹0" },
      mustard: { price: "₹5,800", trend: "down", change: "-₹100" },
      gram: { price: "₹4,500", trend: "up", change: "+₹200" }
    },
    forecast: {
      nextWeek: "Wheat prices expected to rise by ₹100-150",
      nextMonth: "Mustard prices may recover due to export demand",
      seasonal: "Rabi crop prices generally stable till March"
    },
    localLanguage: {
      hindi: {
        wheat: "गेहूं - ₹2,450 (बढ़त में)",
        rice: "चावल - ₹3,200 (स्थिर)",
        mustard: "सरसों - ₹5,800 (गिरावट में)"
      }
    },
    bestSellingLocations: [
      { location: "Delhi Mandi", price: "₹2,500", distance: "150km" },
      { location: "Local Market", price: "₹2,400", distance: "15km" },
      { location: "Processing Unit", price: "₹2,550", distance: "80km" }
    ]
  };

  res.json(marketData);
});

// 22. Volunteer Coordination API
app.get('/api/volunteers', (req, res) => {
  const volunteerPrograms = {
    activePrograms: [
      {
        title: "Digital Literacy for Farmers",
        description: "Teach farmers to use smartphones and apps",
        timeCommitment: "2 hours/week",
        volunteers: 15,
        impact: "500+ farmers trained"
      },
      {
        title: "Organic Farming Awareness",
        description: "Promote organic farming practices",
        timeCommitment: "4 hours/month",
        volunteers: 8,
        impact: "200+ farmers converted to organic"
      }
    ],
    benefits: [
      "Certificate of appreciation",
      "Skill development opportunities",
      "Network with agricultural experts",
      "Contribute to rural development"
    ],
    requirements: [
      "Basic knowledge of farming or technology",
      "Commitment to help farmers",
      "Good communication skills",
      "Available for weekend activities"
    ]
  };
  
  res.json(volunteerPrograms);
});

app.post('/api/volunteers', (req, res) => {
  const { name, location, skills, availability, contact } = req.body;
  
  // Register volunteer
  db.run(
    `INSERT INTO volunteers (name, location, skills, availability, contact_info) 
     VALUES (?, ?, ?, ?, ?)`,
    [name, location, JSON.stringify(skills), availability, contact],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        id: this.lastID,
        message: "Thank you for volunteering!",
        nextSteps: [
          "You will receive training materials via SMS",
          "Local coordinator will contact you within 48 hours",
          "First assignment will be shared based on your availability"
        ]
      });
    }
  );
});

 // Marketplace endpoints (enhanced)
app.get('/api/marketplace', (req, res) => {
  const { crop, location } = req.query;
  
  const buyers = [
    { id: 1, name: "Green Valley Agro", distance: "15km", crop: "Wheat, Rice", rating: "4.8", price: "₹2,500/Quintal", contact: "+91-9876543270" },
    { id: 2, name: "National Food Corp", distance: "42km", crop: "All grains", rating: "4.6", price: "₹2,300/Quintal", contact: "+91-9876543271" },
    { id: 3, name: "Local Market Co-op", distance: "8km", crop: "Vegetables, Fruits", rating: "4.3", price: "₹1,800/Quintal", contact: "+91-9876543272" }
  ];
  
  res.json({ buyers });
});

app.post('/api/marketplace/list', (req, res) => {
  const { cropType, quantity, location, price, contact } = req.body;
  
  db.run(
    `INSERT INTO marketplace (seller_location, crop_type, quantity, price, buyer_contact) 
     VALUES (?, ?, ?, ?, ?)`,
    [location, cropType, quantity, price, contact],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        listingId: this.lastID,
        message: "Your crop has been listed successfully!",
        estimatedInterest: "3-5 buyers expected to contact within 24 hours",
        tips: [
          "Keep your phone available for buyer calls",
          "Prepare quality samples for inspection",
          "Have transport arrangements ready"
        ]
      });
    }
  );
});

if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
    console.log("Krishi Suvidha API endpoints available:");
    console.log("- POST /api/soil-analysis");
    console.log("- GET /api/weather");
    console.log("- GET /api/water-availability");
    console.log("- POST /api/crop-advice");
    console.log("- GET /api/crop-diversification");
    console.log("- GET /api/disease-alerts");
    console.log("- POST /api/quality-monitoring");
    console.log("- POST /api/livestock");
    console.log("- GET /api/demonstrations");
    console.log("- GET /api/vermicompost");
    console.log("- POST /api/drone-services");
    console.log("- POST /api/disease-detection");
    console.log("- GET /api/krishi-kendra");
    console.log("- GET /api/government-schemes");
    console.log("- GET /api/cold-storage");
    console.log("- GET /api/e-mandis");
    console.log("- POST /api/transport");
    console.log("- POST /api/feedback");
    console.log("- POST /api/sms-support");
    console.log("- POST /api/chatbot");
    console.log("- GET /api/market-prices");
    console.log("- GET/POST /api/volunteers");
    console.log("- GET/POST /api/group-farming");
    console.log("- GET /api/marketplace");
    console.log("- POST /api/marketplace/list");
  });
}

/**
 * Group Farming APIs
 * GET /api/group-farming
 * POST /api/group-farming
 */
app.get('/api/group-farming', (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const staticGroups = [
    {
      name: "Progressive Farmers Group",
      location: "Village Rampur",
      members: 25,
      crops: ["Wheat", "Mustard"],
      landArea: "150 acres",
      coordinator: "+91-9876543260",
      achievements: "30% cost reduction, 25% yield increase"
    },
    {
      name: "Organic Farming Collective",
      location: "Village Sundarpur",
      members: 18,
      crops: ["Vegetables", "Pulses"],
      landArea: "80 acres",
      coordinator: "+91-9876543261",
      achievements: "Organic certification, premium prices"
    }
  ];

  const benefits = [
    "Cost sharing for expensive machinery",
    "Bulk procurement of quality inputs",
    "Collective bargaining for better prices",
    "Risk sharing and crop insurance",
    "Knowledge and technology transfer"
  ];

  const governmentSupport = [
    "50% subsidy on machinery purchase",
    "Priority in loan approvals",
    "Technical support from agricultural universities",
    "Market linkage assistance"
  ];

  db.all(
    `SELECT id, group_name, location, crop_type, land_area, coordinator_contact, members_count
       FROM group_farming
       WHERE location LIKE ?`,
    [`%${location}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const dbGroups = (rows || []).map(r => ({
        name: r.group_name,
        location: r.location,
        members: r.members_count || 1,
        crops: r.crop_type ? [r.crop_type] : [],
        landArea: r.land_area,
        coordinator: r.coordinator_contact,
        achievements: undefined
      }));

      res.json({
        nearbyGroups: [...staticGroups, ...dbGroups],
        benefits,
        governmentSupport
      });
    }
  );
});

app.post('/api/group-farming', (req, res) => {
  const { groupName, location, cropType, landArea, coordinatorContact } = req.body;

  if (!groupName || !location || !cropType || !landArea || !coordinatorContact) {
    return res.status(400).json({
      error: 'groupName, location, cropType, landArea, and coordinatorContact are required'
    });
  }

  // Ensure table exists (localized creation to avoid relying on potentially corrupted initialize step)
  db.run(
    `CREATE TABLE IF NOT EXISTS group_farming (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_name TEXT NOT NULL,
      location TEXT NOT NULL,
      crop_type TEXT,
      land_area TEXT,
      coordinator_contact TEXT,
      members_count INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database initialization error' });
      }

      // Insert group initiative
      db.run(
        `INSERT INTO group_farming 
          (group_name, location, crop_type, land_area, coordinator_contact, members_count) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [groupName, location, cropType, landArea, coordinatorContact, 1],
        function (insertErr) {
          if (insertErr) {
            return res.status(500).json({ error: 'Database error' });
          }

          res.json({
            groupId: this.lastID,
            message: "Group farming initiative created successfully!",
            benefits: [
              "Shared machinery costs reduced by 60%",
              "Bulk purchase of inputs saves 20-30%",
              "Better negotiation power with buyers",
              "Knowledge sharing among members"
            ],
            nextSteps: [
              "Invite neighboring farmers to join",
              "Plan crop calendar together",
              "Apply for group farming subsidies"
            ]
          });
        }
      );
    }
  );
});

module.exports = app;
