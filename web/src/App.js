import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Marketplace from "./features/marketplace/Marketplace";
import Weather from "./features/weather/Weather";
import SoilHealth from "./features/soilHealth/SoilHealth";
import DiseaseDetection from "./features/diseaseDetection/DiseaseDetection";
import LocalResources from "./features/localResources/LocalResources";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/soil-health" element={<SoilHealth />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/local-resources" element={<LocalResources />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}