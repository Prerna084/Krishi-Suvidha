// services/diseaseDetection.js

module.exports = {
  detectDisease: async (cropType, imageBuffer) => {
    // In real app, analyze imageBuffer with ML model or external API
    // Here we return mock data

    return {
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
    };
  }
};