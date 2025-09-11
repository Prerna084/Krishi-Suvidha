import React, { useState } from "react";

export default function SoilHealth() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [soilResults, setSoilResults] = useState(null);

  const analyzeSoil = () => {
    setSoilResults({
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
  };

  return (
    <div>
      <h2>Soil Health Analysis</h2>
      <label>
        Farm Location
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter your farm location" />
      </label>
      <label>
        Current Crop
        <select value={cropType} onChange={e => setCropType(e.target.value)}>
          <option value="">Select crop</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="corn">Corn</option>
          <option value="vegetables">Vegetables</option>
        </select>
      </label>
      <button onClick={analyzeSoil} disabled={!location || !cropType}>Analyze Soil</button>

      {soilResults && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Soil Analysis Results</h3>
          <p><strong>pH Level:</strong> {soilResults.pH}</p>
          <p><strong>Nitrogen:</strong> {soilResults.nitrogen}</p>
          <p><strong>Phosphorus:</strong> {soilResults.phosphorus}</p>
          <p><strong>Potassium:</strong> {soilResults.potassium}</p>

          <h3>Recommendations</h3>
          <ul>
            {soilResults.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}