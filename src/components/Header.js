import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ userType, setUserType }) {
  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1>🌱 Krishi Sarthi - Farmer's Companion</h1>
        <select 
          value={userType} 
          onChange={(e) => setUserType(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '2px solid #fff' }}
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="logistics">Logistics</option>
        </select>
      </div>
      <nav>
        <NavLink to="/marketplace" className={({ isActive }) => (isActive ? "active" : "")}>
          Marketplace
        </NavLink>
        <NavLink to="/weather" className={({ isActive }) => (isActive ? "active" : "")}>
          Weather
        </NavLink>
        <NavLink to="/soil-health" className={({ isActive }) => (isActive ? "active" : "")}>
          Soil Health
        </NavLink>
        <NavLink to="/disease-detection" className={({ isActive }) => (isActive ? "active" : "")}>
          Disease Detection
        </NavLink>
        <NavLink to="/local-resources" className={({ isActive }) => (isActive ? "active" : "")}>
          Local Resources
        </NavLink>
      </nav>
    </header>
  );
}