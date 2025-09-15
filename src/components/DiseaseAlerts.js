import React, { useState } from "react";
import { getDiseaseAlerts } from "../services/alertsService";

export default function DiseaseAlerts() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const [error, setError] = useState("");

  async function fetchAlerts(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAlerts(null);
    try {
      const data = await getDiseaseAlerts({ location: location || "Punjab", cropType: cropType || undefined });
      setAlerts(data);
    } catch (err) {
      setError("Failed to fetch alerts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Disease & Pest Alerts</h2>
      <p className="text-gray-600 mb-6">Get current and seasonal alerts for your area. Includes post-harvest storage alerts.</p>

      <form onSubmit={fetchAlerts} className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g., Ludhiana)"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="Crop Type (optional)"
            className="border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-4 py-2"
          >
            {loading ? "Loading..." : "Fetch Alerts"}
          </button>
        </div>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {alerts && (
        <div className="space-y-6">
          {/* Current Alerts */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Current Field Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(alerts.currentAlerts || []).map((a, idx) => (
                <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {a.disease ? `Disease: ${a.disease}` : a.pest ? `Pest: ${a.pest}` : "Alert"}
                    </span>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{a.severity || "Info"}</span>
                  </div>
                  {a.affectedCrops && <p className="text-sm text-gray-700"><strong>Affected:</strong> {(a.affectedCrops || []).join(", ")}</p>}
                  {a.symptoms && <p className="text-sm text-gray-700"><strong>Symptoms:</strong> {a.symptoms}</p>}
                  {a.action && <p className="text-sm text-gray-700"><strong>Action:</strong> {a.action}</p>}
                  {a.preventive && <p className="text-sm text-gray-700"><strong>Preventive:</strong> {a.preventive}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Seasonal Forecast */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Seasonal Forecast</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {(alerts.seasonalForecast || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>

          {/* Post-Harvest Alerts */}
          {Array.isArray(alerts.postHarvestAlerts) && alerts.postHarvestAlerts.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-3">Post-Harvest & Storage Alerts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alerts.postHarvestAlerts.map((p, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-200 rounded p-4">
                    <p className="font-medium mb-1">{p.issue ? p.issue : p.pest}</p>
                    {p.risk && <p className="text-sm text-gray-700"><strong>Risk:</strong> {p.risk}</p>}
                    {p.detection && <p className="text-sm text-gray-700"><strong>Detection:</strong> {p.detection}</p>}
                    {Array.isArray(p.mitigation) && p.mitigation.length > 0 && (
                      <>
                        <p className="text-sm font-medium text-gray-800 mt-2">Mitigation:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {p.mitigation.map((m, k) => <li key={k}>{m}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Preventive Measures */}
          {Array.isArray(alerts.preventiveMeasures) && alerts.preventiveMeasures.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-3">Preventive Measures</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {alerts.preventiveMeasures.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
