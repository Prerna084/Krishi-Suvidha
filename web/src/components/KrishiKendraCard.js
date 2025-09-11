import React from "react";

export default function KrishiKendraCard({ kendra }) {
  return (
    <div className="card">
      <h3>{kendra.name}</h3>
      <p><strong>Distance:</strong> {kendra.distance}</p>
      <p><strong>Phone:</strong> <a href={`tel:${kendra.phone}`}>{kendra.phone}</a></p>
      <p><strong>Services:</strong> {kendra.services.join(", ")}</p>
      <button onClick={() => window.location.href = `tel:${kendra.phone}`}>Call Now</button>
    </div>
  );
}