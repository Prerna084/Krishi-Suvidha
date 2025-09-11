import React from "react";

export default function BuyerCard({ buyer }) {
  return (
    <div className="card">
      <h3>{buyer.name}</h3>
      <p><strong>Distance:</strong> {buyer.distance}</p>
      <p><strong>Crops:</strong> {buyer.crop}</p>
      <p><strong>Rating:</strong> {buyer.rating}</p>
      <button onClick={() => alert(`Contacting ${buyer.name}`)}>Contact</button>
    </div>
  );
}