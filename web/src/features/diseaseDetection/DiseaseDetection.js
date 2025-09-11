import React, { useState } from "react";

export default function DiseaseDetection() {
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [diseaseResults, setDiseaseResults] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setDiseaseResults(null);
    }
  };

  const analyzeDisease = () => {
    // Mock disease detection result
    setDiseaseResults({
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
  };

  return (
    <div>
      <h2>Crop Disease Detection</h2>

      <label>
        Crop Type
        <select value={cropType} onChange={e => setCropType(e.target.value)}>
          <option value="">Select crop</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="corn">Corn</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
        </select>
      </label>

      <label>
        Farm Location
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter your farm location"
        />
      </label>

      <label>
        Upload Image of Affected Crop
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      <button onClick={analyzeDisease} disabled={!cropType || !location || !image}>
        Analyze Disease
      </button>

      {diseaseResults && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Diagnosis</h3>
          <p><strong>Disease:</strong> {diseaseResults.disease}</p>
          <p><strong>Confidence:</strong> {diseaseResults.confidence}</p>
          <p><strong>Description:</strong> {diseaseResults.description}</p>

          <h3>Recommended Treatment</h3>
          <ul>
            {diseaseResults.remedies.map((r, i) => <li key={i}>{r}</li>)}
          </ul>

          <h3>Preventive Measures</h3>
          <ul>
            {diseaseResults.preventive.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <h3>Nearest Krishi Kendra</h3>
          <p>{diseaseResults.krishiKendra.name}</p>
          <p>Phone: <a href={`tel:${diseaseResults.krishiKendra.phone}`}>{diseaseResults.krishiKendra.phone}</a></p>
        </div>
      )}
    </div>
  );
}