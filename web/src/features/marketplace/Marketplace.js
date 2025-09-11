import React, { useState } from "react";
import BuyerCard from "../../components/BuyerCard";
import LogisticsCard from "../../components/LogisticsCard";
import { mockBuyers } from "./buyersdata";

export default function Marketplace() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [buyers, setBuyers] = useState([]);

  const findBuyers = () => {
    // In real app, filter by location and cropType
    setBuyers(mockBuyers);
  };

  return (
    <div>
      <h2>Connect with Buyers</h2>
      <label>
        Crop Type
        <select value={cropType} onChange={e => setCropType(e.target.value)}>
          <option value="">Select crop</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="corn">Corn</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
        </select>
      </label>
      <label>
        Your Location
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter your location" />
      </label>
      <button onClick={findBuyers} disabled={!location || !cropType}>Find Buyers</button>

      {buyers.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Available Buyers</h3>
          {buyers.map((buyer, i) => <BuyerCard key={i} buyer={buyer} />)}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h3>Transportation Logistics</h3>
        <LogisticsCard
          title="Local Truckers"
          description="Connect with verified local transporters"
          onClick={() => alert("Local Truckers feature coming soon!")}
        />
        <LogisticsCard
          title="Shared Logistics"
          description="Share transportation costs with nearby farmers"
          onClick={() => alert("Shared Logistics feature coming soon!")}
        />
        <LogisticsCard
          title="Storage Options"
          description="Find nearby storage facilities"
          onClick={() => alert("Storage Options feature coming soon!")}
        />
      </div>
    </div>
  );
}