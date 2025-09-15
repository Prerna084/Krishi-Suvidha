
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
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Weather Prediction & Advisory</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Farm Location</span>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Enter your farm location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>
          <button
            onClick={fetchWeather}
            disabled={!userLocation || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg h-10 md:h-auto"
          >
            {loading ? "Loading..." : "Get Weather Forecast"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {weatherData && (
        <div className="mt-6 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Weather Conditions</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="text-lg font-semibold text-gray-900">{weatherData.temperature}°C</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="text-lg font-semibold text-gray-900">{weatherData.humidity}%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Rainfall</div>
                <div className="text-lg font-semibold text-gray-900">{weatherData.rainfall} mm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Wind Speed</div>
                <div className="text-lg font-semibold text-gray-900">{weatherData.windSpeed} km/h</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">7-Day Forecast</h3>
            <p className="text-gray-700">{weatherData.forecast}</p>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Farming Advisory</h3>
            <p>{weatherData.advisory}</p>
          </div>

          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Weather Alerts</h3>
              <ul className="list-disc list-inside space-y-1">
                {weatherData.alerts.map((alert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">⚠️</span>
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
