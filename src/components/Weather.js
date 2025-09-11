import React, { useState } from "react";

export default function Weather({ userLocation, setUserLocation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!userLocation) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeatherData({
        temperature: "28°C",
        humidity: "65%",
        rainfall: "15mm expected",
        windSpeed: "12 km/h",
        forecast: "Partly cloudy with chances of light rain",
        advisory: "Suitable for wheat cultivation. Irrigation not required for next 48 hours.",
        alerts: ["Light rain expected in 24 hours"]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h2>Weather Prediction & Advisory</h2>
      
      <div className="card">
        <label>
          Farm Location
          <input 
            type="text" 
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)} 
            placeholder="Enter your farm location" 
          />
        </label>
        
        <button onClick={getWeather} disabled={!userLocation || loading}>
          {loading ? "Loading..." : "Get Weather Forecast"}
        </button>
      </div>

      {weatherData && (
        <div style={{ marginTop: "2rem" }}>
          <div className="card">
            <h3>Current Weather Conditions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>Temperature:</strong> {weatherData.temperature}
              </div>
              <div>
                <strong>Humidity:</strong> {weatherData.humidity}
              </div>
              <div>
                <strong>Rainfall:</strong> {weatherData.rainfall}
              </div>
              <div>
                <strong>Wind Speed:</strong> {weatherData.windSpeed}
              </div>
            </div>
          </div>

          <div className="card">
            <h3>7-Day Forecast</h3>
            <p>{weatherData.forecast}</p>
          </div>

          <div className="card success">
            <h3>Farming Advisory</h3>
            <p>{weatherData.advisory}</p>
          </div>

          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div className="card error">
              <h3>Weather Alerts</h3>
              <ul>
                {weatherData.alerts.map((alert, index) => (
                  <li key={index}>⚠️ {alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}