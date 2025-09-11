import React from "react";

export default function BuyerCard({ buyer }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
        <div>
          <h3>{buyer.name}</h3>
          <p>📍 {buyer.distance} away</p>
          <p>🌾 Crops: {buyer.crop}</p>
          <p>💰 Price: {buyer.price}</p>
          <p>⭐ Rating: {buyer.rating}/5</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={() => alert(`Contacting ${buyer.name}`)}>
            📞 Contact
          </button>
          <button onClick={() => alert(`Negotiating with ${buyer.name}`)}>
            💬 Negotiate
          </button>
        </div>
      </div>
    </div>
  );
}