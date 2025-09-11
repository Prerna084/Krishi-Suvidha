import React from "react";

export default function KrishiKendraCard({ kendra }) {
  // Add null/undefined check to prevent the error
  if (!kendra) {
    return (
      <div className="card">
        <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
          <p>Loading Krishi Kendra information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
        <div>
          <h3>{kendra.name || "Krishi Kendra"}</h3>
          <p>📍 {kendra.distance || "Distance not available"} away</p>
          <p>🏢 Address: {kendra.address || "Address not available"}</p>
          <p>📞 Phone: {kendra.phone || "Phone not available"}</p>
          <p>⭐ Rating: {kendra.rating || "N/A"}/5</p>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>Services:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
              {kendra.services && kendra.services.length > 0 ? (
                kendra.services.map((service, index) => (
                  <span key={index} style={{ 
                    backgroundColor: '#e8f5e8', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem',
                    color: '#2e7d32'
                  }}>
                    {service}
                  </span>
                ))
              ) : (
                <span style={{ color: '#666' }}>No services listed</span>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={() => window.location.href = `tel:${kendra.phone}`} disabled={!kendra.phone}>
            📞 Call Now
          </button>
          <button onClick={() => alert(`Getting directions to ${kendra.name || 'this location'}`)}>
            🗺️ Directions
          </button>
        </div>
      </div>
    </div>
  );
}