import React, { useState } from "react";
import { getWaterAvailability } from "../services/waterAvailabilityService";

export default function WaterAvailability({ userLocation, setUserLocation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWater = async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getWaterAvailability(userLocation);
      setData(res);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to load water availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Water Availability</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
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
          <button
            onClick={fetchWater}
            disabled={!userLocation || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg h-10 md:h-auto"
          >
            {loading ? "Loading..." : "Check Water Availability"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {data && (
        <div className="mt-6 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Overview</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-lg font-semibold text-gray-900">{data.location}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-lg font-semibold text-gray-900">{data.overallStatus}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sources</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(data.sources) &&
                data.sources.map((s, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p className="text-gray-900">
                      <strong>Type:</strong> {s.type}
                    </p>
                    {s.availability && (
                      <p className="text-gray-700">
                        <strong>Availability:</strong> {s.availability}
                      </p>
                    )}
                    {s.depth && (
                      <p className="text-gray-700">
                        <strong>Depth:</strong> {s.depth}
                      </p>
                    )}
                    {s.schedule && (
                      <p className="text-gray-700">
                        <strong>Schedule:</strong> {s.schedule}
                      </p>
                    )}
                    {s.quality && (
                      <p className="text-gray-700">
                        <strong>Quality:</strong> {s.quality}
                      </p>
                    )}
                    {s.potential && (
                      <p className="text-gray-700">
                        <strong>Potential:</strong> {s.potential}
                      </p>
                    )}
                    {s.recommendation && (
                      <p className="text-gray-700">
                        <strong>Recommendation:</strong> {s.recommendation}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1">
              {Array.isArray(data.recommendations) &&
                data.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
