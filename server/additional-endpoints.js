// Additional API endpoints for Krishi Suvidha
// This file contains the remaining endpoints to be added to server/index.js

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

// 14. Government Portals API
app.get('/api/government-schemes', (req, res) => {
  const { location, cropType } = req.query;
  
  const schemes = {
    activeSchemes: [
      {
        name: "PM-KISAN",
        description: "Direct income support to farmers",
        benefit: "₹6,000 per year",
        eligibility: "All landholding farmers",
        applicationLink: "https://pmkisan.gov.in",
        documents: ["Aadhaar", "Bank details", "Land records"]
      },
      {
        name: "Crop Insurance Scheme",
        description: "Protection against crop loss",
        benefit: "Up to 100% sum insured",
        eligibility: "All farmers",
        applicationLink: "https://pmfby.gov.in",
        documents: ["Aadhaar", "Bank details", "Sowing certificate"]
      },
      {
        name: "Soil Health Card Scheme",
        description: "Free soil testing and recommendations",
        benefit: "Free soil analysis",
        eligibility: "All farmers",
        applicationLink: "https://soilhealth.dac.gov.in",
        documents: ["Aadhaar", "Land records"]
      }
    ],
    applicationStatus: {
      pmKisan: "Approved - Next installment due March 2024",
      cropInsurance: "Pending - Submit sowing certificate",
      soilHealth: "Not applied"
    },
    upcomingDeadlines: [
      { scheme: "Kharif Insurance", deadline: "2024-07-31" },
      { scheme: "Subsidy Application", deadline: "2024-03-15" }
    ]
  };

  res.json(schemes);
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
app.post('/api/volunteers', (req, res) => {
  const { name, location, skills, availability, contact } = req.body;
  
  if (req.method === 'POST') {
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
  } else {
    // Get available volunteers
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
  }
});

// 23. Group Farming API
app.post('/api/group-farming', (req, res) => {
  const { groupName, location, cropType, landArea, coordinatorContact } = req.body;
  
  if (req.method === 'POST') {
    // Create/Join group
    db.run(
      `INSERT INTO group_farming (group_name, location, crop_type, land_area, coordinator_contact, members_count) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [groupName, location, cropType, landArea, coordinatorContact, 1],
      function(err) {
        if (err) {
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
  } else {
    // Get existing groups
    const groupFarmingInfo = {
      nearbyGroups: [
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
      ],
      benefits: [
        "Cost sharing for expensive machinery",
        "Bulk procurement of quality inputs",
        "Collective bargaining for better prices",
        "Risk sharing and crop insurance",
        "Knowledge and technology transfer"
      ],
      governmentSupport: [
        "50% subsidy on machinery purchase",
        "Priority in loan approvals",
        "Technical support from agricultural universities",
        "Market linkage assistance"
      ]
    };
    
    res.json(groupFarmingInfo);
  }
});
