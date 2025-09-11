import React, { useState } from "react";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = () => {
    // Mock weather data
    setWeatherData({
      temperature: "28°C",
      humidity: "65%",
      rainfall: "15mm expected",
      forecast: "Partly cloudy with chances of light rain",
      advisory: "Suitable for wheat cultivation. Irrigation not required for next 48 hours."
    });
  };

  return (
    <div>
      <h2>Weather Prediction & Advisory</h2>
      <label>
        Location
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter your farm location" />
      </label>
      <button onClick={getWeather} disabled={!location}>Get Weather Forecast</button>

      {weatherData && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Current Conditions</h3>
          <p><strong>Temperature:</strong> {weatherData.temperature}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}</p>
          <p><strong>Rainfall:</strong> {weatherData.rainfall}</p>
          <p><strong>Forecast:</strong> {weatherData.forecast}</p>

          <h3>Farming Advisory</h3>
          <p style={{ backgroundColor: "#c8e6c9", padding: "1rem", borderRadius: "6px" }}>{weatherData.advisory}</p>
        </div>
      )}
    </div>
  );
}