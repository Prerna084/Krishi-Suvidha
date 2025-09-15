import React, { useState } from "react";
import { analyzeSoil as analyzeSoilService } from "../services/soilHealthService";

export default function SoilHealth({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [soilData, setSoilData] = useState({
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: ""
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setSoilData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyzeSoil = async () => {
    if (!userLocation || !cropType) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeSoilService({
        location: userLocation,
        cropType,
        pH: soilData.pH,
        nitrogen: soilData.nitrogen,
        phosphorus: soilData.phosphorus,
        potassium: soilData.potassium
      });
      setResults(result);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to analyze soil. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Soil Health Analysis</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Current Crop</span>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select crop</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">pH Level</span>
            <input
              type="number"
              step="0.1"
              value={soilData.pH}
              onChange={(e) => handleInputChange("pH", e.target.value)}
              placeholder="Enter pH value (0-14)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Nitrogen Level</span>
            <select
              value={soilData.nitrogen}
              onChange={(e) => handleInputChange("nitrogen", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Phosphorus Level</span>
            <select
              value={soilData.phosphorus}
              onChange={(e) => handleInputChange("phosphorus", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Potassium Level</span>
            <select
              value={soilData.potassium}
              onChange={(e) => handleInputChange("potassium", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAnalyzeSoil}
            disabled={!userLocation || !cropType || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            {loading ? "Analyzing..." : "Analyze Soil"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Soil Analysis Results</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">pH Level</div>
                <div className="text-lg font-semibold text-gray-900">{results.analysis.pH}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Nitrogen</div>
                <div className="text-lg font-semibold text-gray-900">{results.analysis.nitrogen}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Phosphorus</div>
                <div className="text-lg font-semibold text-gray-900">{results.analysis.phosphorus}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Potassium</div>
                <div className="text-lg font-semibold text-gray-900">{results.analysis.potassium}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Overall Health</div>
                <div className="text-lg font-semibold text-gray-900">{results.soilHealth}</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
