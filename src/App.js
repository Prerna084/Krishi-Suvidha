import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import Weather from "./components/Weather";
import SoilHealth from "./components/SoilHealth";
import DiseaseDetection from "./components/DiseaseDetection";
import LocalResources from "./components/LocalResources";

function App() {
  const [userLocation, setUserLocation] = useState("");
  const [userType, setUserType] = useState("farmer");

  return (
    <div className="app-container">
      <Header userType={userType} setUserType={setUserType} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<Marketplace userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/weather" element={<Weather userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/soil-health" element={<SoilHealth userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/disease-detection" element={<DiseaseDetection userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/local-resources" element={<LocalResources userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;