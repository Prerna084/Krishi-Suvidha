import React, { useState } from "react";
import KrishiKendraCard from "./KrishiKendraCard";
import { fetchKrishiKendras } from "../services/localResourcesService";

export default function LocalResources({ userLocation, setUserLocation }) {
  const [kendras, setKendras] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const findResources = async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchKrishiKendras(userLocation);
      const nearest = Array.isArray(res?.nearest) ? res.nearest : [];
      const emergencies = Array.isArray(res?.emergencyContacts) ? res.emergencyContacts : [];
      setKendras(nearest);
      setEmergencyContacts(emergencies);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to load local resources");
    } finally {
      setLoading(false);
    }
  };

  const validKendras = Array.isArray(kendras)
    ? kendras.filter(k => k && typeof k === "object")
    : [];

  return (
    <div>
      <h2>Local Resources - Krishi Kendras & Support</h2>
      
      <div className="card">
        <label>
          Your Location
          <input 
            type="text" 
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)} 
            placeholder="Enter your location to find nearest resources" 
          />
        </label>

        <button onClick={findResources} disabled={!userLocation || loading}>
          {loading ? "Searching..." : "Find Resources"}
        </button>

        <p style={{ marginTop: '1rem', color: '#666' }}>
          {userLocation ? `Showing resources near: ${userLocation}` : "Enter location to see nearby resources"}
        </p>
      </div>

      {error && (
        <div className="card error" style={{ marginTop: "1rem" }}>
          <h3>Error</h3>
          <p>{String(error)}</p>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h3>Nearby Krishi Kendras & Agricultural Centers</h3>
        {loading ? (
          <div className="card">
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Loading resources...</p>
            </div>
          </div>
        ) : validKendras.length > 0 ? (
          validKendras.map((kendra, idx) => (
            <KrishiKendraCard key={kendra.id || idx} kendra={kendra} />
          ))
        ) : (
          <div className="card">
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              <p>No Krishi Kendras found. Enter your location and click "Find Resources".</p>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: "2rem" }}>
        <h3>Emergency Resources</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {Array.isArray(emergencyContacts) && emergencyContacts.length > 0 ? (
            emergencyContacts.map((c, i) => (
              <div key={i} className="card">
                <h4>{c.service || "Emergency Service"}</h4>
                <p><strong>Phone:</strong> {c.phone}</p>
              </div>
            ))
          ) : (
            <>
              <div className="card error">
                <h4>🆘 Crop Emergency Helpline</h4>
                <p>24/7 support for urgent crop issues</p>
                <p><strong>Phone: +91-1800-123-4567</strong></p>
              </div>
              
              <div className="card">
                <h4>🌦️ Weather Alert Subscription</h4>
                <p>Get severe weather warnings via SMS</p>
                <button>Subscribe Now</button>
              </div>
              
              <div className="card success">
                <h4>👨‍🌾 Expert Consultation</h4>
                <p>Schedule a call with agricultural experts</p>
                <button>Book Consultation</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
