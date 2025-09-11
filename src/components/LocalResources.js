import React, { useState } from "react";
import KrishiKendraCard from "./KrishiKendraCard";

const mockKendras = [
  {
    id: 1,
    name: "Krishi Vigyan Kendra Main",
    distance: "12km",
    phone: "+91-9876543210",
    address: "Near Block Office, Main Road",
    services: ["Soil Testing", "Training", "Seeds", "Consultation"],
    rating: "4.8"
  },
  {
    id: 2,
    name: "District Agriculture Office",
    distance: "25km",
    phone: "+91-9765432109",
    address: "District Headquarters",
    services: ["Subsidies", "Consultation", "Equipment", "Loans"],
    rating: "4.6"
  },
  {
    id: 3,
    name: "Community Agri Center",
    distance: "7km",
    phone: "+91-9654321098",
    address: "Village Market Road",
    services: ["Emergency Support", "Market Linkage", "Weather Info"],
    rating: "4.3"
  }
];

export default function LocalResources({ userLocation, setUserLocation }) {
  const [kendras] = useState(mockKendras);
  const [loading, setLoading] = useState(false);

  // Make sure kendras data is properly structured
  const validKendras = kendras.filter(kendra => kendra && typeof kendra === 'object');

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
        
        <p style={{ marginTop: '1rem', color: '#666' }}>
          Showing resources near: {userLocation || "Enter location to see nearby resources"}
        </p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Nearby Krishi Kendras & Agricultural Centers</h3>
        {loading ? (
          <div className="card">
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Loading resources...</p>
            </div>
          </div>
        ) : validKendras.length > 0 ? (
          validKendras.map(kendra => (
            <KrishiKendraCard key={kendra.id} kendra={kendra} />
          ))
        ) : (
          <div className="card">
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              <p>No Krishi Kendras found in your area.</p>
            </div>
          </div>
        )}
      </div>

      {/* Rest of the component remains the same */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <h3>Emergency Resources</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
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
        </div>
      </div>
    </div>
  );
}