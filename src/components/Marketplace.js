import React, { useState } from "react";
import BuyerCard from "./BuyerCard";
import LogisticsCard from "./LogisticsCard";

const mockBuyers = [
  { id: 1, name: "Green Valley Agro", distance: "15km", crop: "Wheat, Rice", rating: "4.8", price: "₹2,500/Quintal" },
  { id: 2, name: "National Food Corp", distance: "42km", crop: "All grains", rating: "4.6", price: "₹2,300/Quintal" },
  { id: 3, name: "Local Market Co-op", distance: "8km", crop: "Vegetables, Fruits", rating: "4.3", price: "₹1,800/Quintal" }
];

const mockLogistics = [
  { id: 1, name: "AgroTrans Logistics", type: "Local Truckers", capacity: "5 Tons", rating: "4.7", price: "₹3/km" },
  { id: 2, name: "Farmers Freight", type: "Shared Transport", capacity: "3 Tons", rating: "4.5", price: "₹2.5/km" },
  { id: 3, name: "GreenField Transport", type: "Storage & Transport", capacity: "10 Tons", rating: "4.8", price: "₹4/km" }
];

export default function Marketplace({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [showLogistics, setShowLogistics] = useState(false);

  const findBuyers = () => {
    setBuyers(mockBuyers);
  };

  return (
    <div>
      <h2>Marketplace - Connect Directly with Buyers</h2>
      
      <div className="card">
        <h3>Sell Your Produce</h3>
        <label>
          Crop Type
          <select value={cropType} onChange={e => setCropType(e.target.value)}>
            <option value="">Select crop type</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="corn">Corn</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
          </select>
        </label>
        
        <label>
          Quantity (Quintal)
          <input 
            type="number" 
            value={quantity} 
            onChange={e => setQuantity(e.target.value)} 
            placeholder="Enter quantity" 
          />
        </label>
        
        <label>
          Your Location
          <input 
            type="text" 
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)} 
            placeholder="Enter your location" 
          />
        </label>
        
        <button onClick={findBuyers} disabled={!cropType || !quantity || !userLocation}>
          Find Buyers
        </button>
      </div>

      {buyers.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Available Buyers</h3>
          {buyers.map(buyer => (
            <BuyerCard key={buyer.id} buyer={buyer} />
          ))}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h3>Transportation Logistics</h3>
        <button onClick={() => setShowLogistics(!showLogistics)}>
          {showLogistics ? "Hide" : "Show"} Logistics Options
        </button>
        
        {showLogistics && (
          <div>
            {mockLogistics.map(logistic => (
              <LogisticsCard key={logistic.id} logistic={logistic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}