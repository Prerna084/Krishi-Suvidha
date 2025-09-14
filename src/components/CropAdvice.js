import React, { useState } from "react";
import { getCropAdvice } from "../services/cropAdviceService";

export default function CropAdvice({ userLocation, setUserLocation }) {
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [currentCrop, setCurrentCrop] = useState("");
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getCropAdvice({
        location: userLocation,
        soilType,
        season,
        currentCrop,
      });
      setAdvice(res);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to fetch crop advice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Smart Crop Advice</h2>

      <div className="card">
        <label>
          Location
          <input
            type="text"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            placeholder="Enter your farm location"
          />
        </label>

        <label>
          Soil Type
          <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
            <option value="">Select soil type</option>
            <option value="sandy">Sandy</option>
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
            <option value="silty">Silty</option>
            <option value="peaty">Peaty</option>
          </select>
        </label>

        <label>
          Season
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="">Select season</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </select>
        </label>

        <label>
          Current Crop (optional)
          <select value={currentCrop} onChange={(e) => setCurrentCrop(e.target.value)}>
            <option value="">Select crop</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="corn">Corn</option>
            <option value="mustard">Mustard</option>
            <option value="gram">Gram</option>
            <option value="vegetables">Vegetables</option>
          </select>
        </label>

        <button onClick={fetchAdvice} disabled={!userLocation || loading}>
          {loading ? "Loading..." : "Get Crop Advice"}
        </button>
      </div>

      {error && (
        <div className="card error" style={{ marginTop: "1rem" }}>
          <h3>Error</h3>
          <p>{String(error)}</p>
        </div>
      )}

      {advice && (
        <div style={{ marginTop: "2rem" }}>
          <div className="card">
            <h3>Recommended Crops</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {Array.isArray(advice.recommendedCrops) &&
                advice.recommendedCrops.map((c, i) => (
                  <div key={i} className="card" style={{ border: "1px solid #eee" }}>
                    <p><strong>Name:</strong> {c.name}</p>
                    <p><strong>Suitability:</strong> {c.suitability}</p>
                    <p><strong>Expected Yield:</strong> {c.expectedYield}</p>
                    {c.season && <p><strong>Season:</strong> {c.season}</p>}
                  </div>
                ))}
            </div>
          </div>

          <div className="card success">
            <h3>Diversification Options</h3>
            <ul>
              {Array.isArray(advice.diversificationOptions) &&
                advice.diversificationOptions.map((opt, idx) => <li key={idx}>• {opt}</li>)}
            </ul>
          </div>

          <div className="card">
            <h3>Seasonal Tips</h3>
            <ul>
              {Array.isArray(advice.seasonalTips) &&
                advice.seasonalTips.map((tip, idx) => <li key={idx}>• {tip}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
