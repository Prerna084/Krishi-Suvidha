import React, { useState } from "react";
import { fetchMarketPrices } from "../services/marketPricesService";

export default function MarketPrices() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState("");

  async function loadPrices(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrices(null);
    try {
      const data = await fetchMarketPrices({
        location: location || "Punjab",
        cropType: cropType || undefined,
        language: language || undefined
      });
      setPrices(data);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Failed to load market prices");
    } finally {
      setLoading(false);
    }
  }

  const entries = prices && prices.currentPrices ? Object.entries(prices.currentPrices) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Market Prices</h2>
      <p className="text-gray-600 mb-6">Check current mandi prices and short-term forecasts.</p>

      <form onSubmit={loadPrices} className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Punjab or Ludhiana"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Crop</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="border rounded px-3 py-2 w-full bg-white"
            >
              <option value="">All</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="mustard">Mustard</option>
              <option value="gram">Gram</option>
              <option value="corn">Corn</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-3 py-2 w-full bg-white"
            >
              <option value="">Default</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-4 py-2 w-full"
            >
              {loading ? "Loading..." : "Get Prices"}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">
          {error}
        </div>
      )}

      {entries.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="py-3 px-4 text-left">Crop</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Trend</th>
                  <th className="py-3 px-4 text-left">Change</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([crop, info]) => (
                  <tr key={crop} className="border-b border-gray-200">
                    <td className="py-3 px-4 capitalize">{crop}</td>
                    <td className="py-3 px-4">{info?.price}</td>
                    <td className={`py-3 px-4 ${info?.trend === "up" ? "text-green-600" : info?.trend === "down" ? "text-red-600" : ""}`}>
                      {info?.trend || "-"}
                    </td>
                    <td className="py-3 px-4">{info?.change || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {prices?.forecast && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Forecast</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {prices.forecast.nextWeek && <li>Next Week: {prices.forecast.nextWeek}</li>}
            {prices.forecast.nextMonth && <li>Next Month: {prices.forecast.nextMonth}</li>}
            {prices.forecast.seasonal && <li>Seasonal: {prices.forecast.seasonal}</li>}
          </ul>
        </div>
      )}

      {Array.isArray(prices?.bestSellingLocations) && prices.bestSellingLocations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Best Selling Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prices.bestSellingLocations.map((l, i) => (
              <div key={i} className="border rounded p-3">
                <p className="font-medium">{l.location}</p>
                <p className="text-gray-700 text-sm">Price: {l.price}</p>
                <p className="text-gray-700 text-sm">Distance: {l.distance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
