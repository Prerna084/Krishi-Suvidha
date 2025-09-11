import React from "react";

export default function LogisticsCard({ logistic }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
        <div>
          <h3>{logistic.name}</h3>
          <p>📦 Service: {logistic.type}</p>
          <p>⚖️ Capacity: {logistic.capacity}</p>
          <p>💰 Rate: {logistic.price}</p>
          <p>⭐ Rating: {logistic.rating}/5</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={() => alert(`Booking ${logistic.name}`)}>
            📋 Book Now
          </button>
          <button onClick={() => alert(`Contacting ${logistic.name}`)}>
            📞 Contact
          </button>
        </div>
      </div>
    </div>
  );
}