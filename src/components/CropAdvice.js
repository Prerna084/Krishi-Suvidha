import React, { useState } from "react";
import { getCropAdvice } from "../services/cropAdviceService";

export default function CropAdvice({ userLocation, setUserLocation }) {
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [currentCrop, setCurrentCrop] = useState("");
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getCropAdvice({
        location: userLocation,
        soilType,
        season,
        currentCrop,
      });
      setAdvice(res);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to fetch crop advice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Smart Crop Advice</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Location</span>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Enter your farm location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Soil Type</span>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select soil type</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
              <option value="silty">Silty</option>
              <option value="peaty">Peaty</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Season</span>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select season</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Zaid">Zaid</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Current Crop (optional)</span>
            <select
              value={currentCrop}
              onChange={(e) => setCurrentCrop(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select crop</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="mustard">Mustard</option>
              <option value="gram">Gram</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <button
            onClick={fetchAdvice}
            disabled={!userLocation || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Get Crop Advice"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {advice && (
        <div className="mt-6 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Crops</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(advice.recommendedCrops) &&
                advice.recommendedCrops.map((c, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-lg font-semibold text-gray-900">{c.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          c.suitability === 'High'
                            ? 'bg-green-100 text-green-800'
                            : c.suitability === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {c.suitability}
                        {typeof c.suitabilityScore === 'number' ? ` • ${c.suitabilityScore}` : ''}
                      </span>
                    </div>

                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                      {c.expectedYield && (
                        <p>
                          <strong>Expected Yield:</strong> {c.expectedYield}
                        </p>
                      )}
                      {c.season && (
                        <p>
                          <strong>Season:</strong> {c.season}
                        </p>
                      )}
                      {c.sowingWindow && (
                        <p>
                          <strong>Sowing Window:</strong> {c.sowingWindow}
                        </p>
                      )}
                      {c.waterNeed && (
                        <p>
                          <strong>Water Need:</strong> {c.waterNeed}
                        </p>
                      )}
                      {c.risk && (
                        <p>
                          <strong>Risk:</strong> {c.risk}
                        </p>
                      )}
                      {c.marketSignal && (
                        <p>
                          <strong>Market:</strong>{' '}
                          <span
                            className={
                              c.marketSignal === 'up'
                                ? 'text-green-700'
                                : c.marketSignal === 'down'
                                ? 'text-red-700'
                                : 'text-gray-700'
                            }
                          >
                            {c.marketSignal}
                          </span>
                        </p>
                      )}
                    </div>

                    {Array.isArray(c.inputs) && c.inputs.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-900">Key Inputs</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {c.inputs.map((inp, idx) => (
                            <li key={idx}>{inp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(c.rationale) && c.rationale.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-900">Why recommended</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {c.rationale.slice(0, 5).map((r, idx) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Diversification Options</h3>
            <ul className="list-disc list-inside space-y-1">
              {Array.isArray(advice.diversificationOptions) &&
                advice.diversificationOptions.map((opt, idx) => <li key={idx}>• {opt}</li>)}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seasonal Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              {Array.isArray(advice.seasonalTips) &&
                advice.seasonalTips.map((tip, idx) => <li key={idx}>• {tip}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
