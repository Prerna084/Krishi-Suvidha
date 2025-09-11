import React from "react";

export default function LogisticsCard({ title, description, onClick }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClick}>Select</button>
    </div>
  );
}