import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Krishi Saathi</h1>
      <nav>
        <NavLink to="/marketplace" className={({ isActive }) => (isActive ? "active" : "")}>Marketplace</NavLink>
        <NavLink to="/weather" className={({ isActive }) => (isActive ? "active" : "")}>Weather</NavLink>
        <NavLink to="/soil-health" className={({ isActive }) => (isActive ? "active" : "")}>Soil Health</NavLink>
        <NavLink to="/disease-detection" className={({ isActive }) => (isActive ? "active" : "")}>Disease Detection</NavLink>
        <NavLink to="/local-resources" className={({ isActive }) => (isActive ? "active" : "")}>Local Resources</NavLink>
      </nav>
    </header>
  );
}