import React, { useState } from "react";
import BuyerCard from "./BuyerCard";
import LogisticsCard from "./LogisticsCard";
import { fetchBuyers, listCropForSale } from "../services/marketplaceService";

const mockLogistics = [
  { id: 1, name: "AgroTrans Logistics", type: "Local Truckers", capacity: "5 Tons", rating: "4.7", price: "₹3/km" },
  { id: 2, name: "Farmers Freight", type: "Shared Transport", capacity: "3 Tons", rating: "4.5", price: "₹2.5/km" },
  { id: 3, name: "GreenField Transport", type: "Storage & Transport", capacity: "10 Tons", rating: "4.8", price: "₹4/km" }
];

export default function Marketplace({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLogistics, setShowLogistics] = useState(false);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [listResponse, setListResponse] = useState(null);

  const findBuyers = async () => {
    if (!cropType || !quantity || !userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchBuyers(cropType, userLocation);
      const list = Array.isArray(res?.buyers) ? res.buyers : [];
      setBuyers(list);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to fetch buyers");
    } finally {
      setLoading(false);
    }
  };

  const listMyCrop = async () => {
    if (!cropType || !quantity || !userLocation || !price || !contact) return;
    setLoading(true);
    setError(null);
    setListResponse(null);
    try {
      const res = await listCropForSale({
        cropType,
        quantity: Number(quantity),
        location: userLocation,
        price,
        contact
      });
      setListResponse(res);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to list crop");
    } finally {
      setLoading(false);
    }
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem", marginTop: "0.5rem" }}>
          <label>
            Expected Price (e.g., ₹2500/Quintal)
            <input 
              type="text" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              placeholder="Enter expected price"
            />
          </label>
          <label>
            Contact Number
            <input 
              type="tel" 
              value={contact} 
              onChange={e => setContact(e.target.value)} 
              placeholder="+91-XXXXXXXXXX"
            />
          </label>
        </div>
        
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <button onClick={findBuyers} disabled={!cropType || !quantity || !userLocation || loading}>
            {loading ? "Loading..." : "Find Buyers"}
          </button>
          <button onClick={listMyCrop} disabled={!cropType || !quantity || !userLocation || !price || !contact || loading}>
            {loading ? "Listing..." : "List My Crop"}
          </button>
        </div>
      </div>

      {error && (
        <div className="card error" style={{ marginTop: "1rem" }}>
          <h3>Error</h3>
          <p>{String(error)}</p>
        </div>
      )}

      {listResponse && (
        <div className="card success" style={{ marginTop: "1rem" }}>
          <h3>Listing Created</h3>
          <p>{listResponse.message || "Your crop has been listed successfully."}</p>
          {Array.isArray(listResponse.tips) && (
            <ul>
              {listResponse.tips.map((t, i) => <li key={i}>• {t}</li>)}
            </ul>
          )}
        </div>
      )}

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
