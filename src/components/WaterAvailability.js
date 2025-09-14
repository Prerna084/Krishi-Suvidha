import React, { useState } from "react";
import { getWaterAvailability } from "../services/waterAvailabilityService";

export default function WaterAvailability({ userLocation, setUserLocation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWater = async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getWaterAvailability(userLocation);
      setData(res);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to load water availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Water Availability</h2>

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

        <button onClick={fetchWater} disabled={!userLocation || loading}>
          {loading ? "Loading..." : "Check Water Availability"}
        </button>
      </div>

      {error && (
        <div className="card error" style={{ marginTop: "1rem" }}>
          <h3>Error</h3>
          <p>{String(error)}</p>
        </div>
      )}

      {data && (
        <div style={{ marginTop: "2rem" }}>
          <div className="card">
            <h3>Overview</h3>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Status:</strong> {data.overallStatus}</p>
          </div>

          <div className="card">
            <h3>Sources</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {Array.isArray(data.sources) && data.sources.map((s, idx) => (
                <div key={idx} className="card" style={{ border: "1px solid #eee" }}>
                  <p><strong>Type:</strong> {s.type}</p>
                  {s.availability && <p><strong>Availability:</strong> {s.availability}</p>}
                  {s.depth && <p><strong>Depth:</strong> {s.depth}</p>}
                  {s.schedule && <p><strong>Schedule:</strong> {s.schedule}</p>}
                  {s.quality && <p><strong>Quality:</strong> {s.quality}</p>}
                  {s.potential && <p><strong>Potential:</strong> {s.potential}</p>}
                  {s.recommendation && <p><strong>Recommendation:</strong> {s.recommendation}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="card success">
            <h3>Recommendations</h3>
            <ul>
              {Array.isArray(data.recommendations) && data.recommendations.map((r, i) => (
                <li key={i}>✓ {r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
