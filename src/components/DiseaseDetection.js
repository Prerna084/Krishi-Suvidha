import React, { useState } from "react";
import { detectDisease as detectDiseaseService } from "../services/diseaseDetectionService";

export default function DiseaseDetection({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const detectDisease = async () => {
    if (!cropType || !userLocation || !imageFile) return;

    setLoading(true);
    setError(null);
    try {
      const res = await detectDiseaseService(imageFile, cropType, userLocation);
      setResults(res);
    } catch (err) {
      setError(err?.message || "Disease detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crop Disease Detection</h2>
      
      <div className="card">
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
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)} 
            placeholder="Enter your farm location" 
          />
        </label>

        <label>
          Upload Image of Affected Crop
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            style={{ padding: '0.5rem' }}
          />
        </label>

        {imagePreview && (
          <div style={{ marginTop: '1rem' }}>
            <img 
              src={imagePreview} 
              alt="Uploaded crop for disease detection" 
              style={{ maxWidth: '300px', maxHeight: '200px' }}
            />
          </div>
        )}

        <button onClick={detectDisease} disabled={!cropType || !userLocation || !imageFile || loading}>
          {loading ? "Analyzing..." : "Detect Disease"}
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
            <h3>Diagnosis Results</h3>
            <p><strong>Disease:</strong> {results.disease}</p>
            <p><strong>Confidence:</strong> {results.confidence}</p>
            <p><strong>Description:</strong> {results.description}</p>
          </div>

          <div className="card error">
            <h3>Recommended Treatment</h3>
            <ul>
              {results.remedies.map((remedy, index) => (
                <li key={index}>💊 {remedy}</li>
              ))}
            </ul>
          </div>

          <div className="card success">
            <h3>Preventive Measures</h3>
            <ul>
              {results.preventive.map((preventive, index) => (
                <li key={index}>🛡️ {preventive}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>Nearest Krishi Kendra Support</h3>
            <p><strong>Name:</strong> {results.krishiKendra.name}</p>
            <p><strong>Distance:</strong> {results.krishiKendra.distance}</p>
            <p><strong>Phone:</strong> 
              <a href={`tel:${results.krishiKendra.phone}`} style={{ color: '#2e7d32', marginLeft: '0.5rem' }}>
                {results.krishiKendra.phone}
              </a>
            </p>
            <p><strong>Address:</strong> {results.krishiKendra.address}</p>
            <button onClick={() => window.location.href = `tel:${results.krishiKendra.phone}`}>
              📞 Call Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}