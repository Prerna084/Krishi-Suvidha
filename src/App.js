import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import Weather from "./components/Weather";
import SoilHealth from "./components/SoilHealth";
import DiseaseDetection from "./components/DiseaseDetection";
import LocalResources from "./components/LocalResources";
import WaterAvailability from "./components/WaterAvailability";
import CropAdvice from "./components/CropAdvice";
import GroupFarming from "./components/GroupFarming";
import Schemes from "./components/Schemes";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import DiseaseAlerts from "./components/DiseaseAlerts";
import QualityMonitoring from "./components/QualityMonitoring";
import Livestock from "./components/Livestock";
import Vermicompost from "./components/Vermicompost";
import DroneServices from "./components/DroneServices";
import MarketPrices from "./components/MarketPrices";
import Demonstrations from "./components/Demonstrations";

function App() {
  const [userLocation, setUserLocation] = useState("");
  const [userType, setUserType] = useState("farmer");

  return (
    <div className="app-container">
      <Header userType={userType} setUserType={setUserType} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/weather" element={<Weather userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/soil-health" element={<SoilHealth userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/disease-detection" element={<DiseaseDetection userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/local-resources" element={<LocalResources userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/water" element={<WaterAvailability userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/crop-advice" element={<CropAdvice userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/group-farming" element={<GroupFarming userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/alerts" element={<DiseaseAlerts />} />
          <Route path="/quality-monitoring" element={<QualityMonitoring />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/vermicompost" element={<Vermicompost />} />
          <Route path="/drone-services" element={<DroneServices />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/demonstrations" element={<Demonstrations />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
