
import React, { useState } from "react";
import { getWeather } from "../services/weatherService";

export default function Weather({ userLocation, setUserLocation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!userLocation) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(userLocation);
      setWeatherData(data);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
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

        <button onClick={fetchWeather} disabled={!userLocation || loading}>
          {loading ? "Loading..." : "Get Weather Forecast"}
        </button>
      </div>

      {error && (
        <div className="card error" style={{ marginTop: "1rem" }}>
          <h3>Error</h3>
          <p>{String(error)}</p>
        </div>
      )}

      {weatherData && (
        <div style={{ marginTop: "2rem" }}>
          <div className="card">
            <h3>Current Weather Conditions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div>
                <strong>Temperature:</strong> {weatherData.temperature}°C
              </div>
              <div>
                <strong>Humidity:</strong> {weatherData.humidity}%
              </div>
              <div>
                <strong>Rainfall:</strong> {weatherData.rainfall} mm
              </div>
              <div>
                <strong>Wind Speed:</strong> {weatherData.windSpeed} km/h
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
