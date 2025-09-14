import React, { useState } from "react";
import { analyzeSoil as analyzeSoilService } from "../services/soilHealthService";

export default function SoilHealth({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [soilData, setSoilData] = useState({
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: ""
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyzeSoil = async () => {
    if (!userLocation || !cropType) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeSoilService({
        location: userLocation,
        cropType,
        pH: soilData.pH,
        nitrogen: soilData.nitrogen,
        phosphorus: soilData.phosphorus,
        potassium: soilData.potassium
      });
      setResults(result);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to analyze soil. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Soil Health Analysis</h2>
      
      <div className="card">
        <label>
          Farm Location
          <input 
            type="text" 
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)} 
            placeholder="Enter your farm location" 
          />
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

        <h3>Soil Test Results</h3>
        
        <label>
          pH Level
          <input 
            type="number" 
            step="0.1"
            value={soilData.pH}
            onChange={e => handleInputChange("pH", e.target.value)}
            placeholder="Enter pH value (0-14)"
          />
        </label>

        <label>
          Nitrogen Level
          <select value={soilData.nitrogen} onChange={e => handleInputChange("nitrogen", e.target.value)}>
            <option value="">Select level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Phosphorus Level
          <select value={soilData.phosphorus} onChange={e => handleInputChange("phosphorus", e.target.value)}>
            <option value="">Select level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Potassium Level
          <select value={soilData.potassium} onChange={e => handleInputChange("potassium", e.target.value)}>
            <option value="">Select level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button onClick={handleAnalyzeSoil} disabled={!userLocation || !cropType || loading}>
          {loading ? "Analyzing..." : "Analyze Soil"}
        </button>
      </div>

      {error && (
        <div className="card error" style={{ marginTop: "1rem" }}>
          <h3>Error</h3>
          <p>{String(error)}</p>
        </div>
      )}

      {results && (
        <div style={{ marginTop: "2rem" }}>
          <div className="card">
            <h3>Soil Analysis Results</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div><strong>pH Level:</strong> {results.analysis.pH}</div>
              <div><strong>Nitrogen:</strong> {results.analysis.nitrogen}</div>
              <div><strong>Phosphorus:</strong> {results.analysis.phosphorus}</div>
              <div><strong>Potassium:</strong> {results.analysis.potassium}</div>
              <div><strong>Overall Health:</strong> {results.soilHealth}</div>
            </div>
          </div>

          <div className="card success">
            <h3>Recommendations</h3>
            <ul>
              {results.recommendations.map((rec, index) => (
                <li key={index}>✓ {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}