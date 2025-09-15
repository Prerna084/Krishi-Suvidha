import React, { useState } from "react";
import { getQualityReport } from "../services/qualityMonitoringService";

export default function QualityMonitoring() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [qualityParams, setQualityParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  function handleParamChange(e) {
    const { name, value } = e.target;
    setQualityParams((prev) => ({ ...prev, [name]: value }));
  }

  async function fetchReport(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const data = await getQualityReport({
        location,
        cropType,
        harvestDate,
        qualityParameters: qualityParams,
      });
      setReport(data);
    } catch (err) {
      setError("Failed to fetch quality report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Quality Monitoring</h2>
      <p className="text-gray-600 mb-6">Segregate crop quality for pricing and market readiness.</p>

      <form onSubmit={fetchReport} className="bg-white rounded-lg p-4 shadow mb-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Crop Type</label>
          <input
            type="text"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="Enter crop type"
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Harvest Date</label>
          <input
            type="date"
            value={harvestDate}
            onChange={(e) => setHarvestDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <fieldset className="border p-3 rounded">
          <legend className="font-semibold mb-2">Quality Parameters (optional)</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Moisture (%)</label>
              <input
                type="text"
                name="moisture"
                value={qualityParams.moisture || ""}
                onChange={handleParamChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Protein (%)</label>
              <input
                type="text"
                name="protein"
                value={qualityParams.protein || ""}
                onChange={handleParamChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Foreign Matter (%)</label>
              <input
                type="text"
                name="foreignMatter"
                value={qualityParams.foreignMatter || ""}
                onChange={handleParamChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Damaged Grains (%)</label>
              <input
                type="text"
                name="damagedGrains"
                value={qualityParams.damagedGrains || ""}
                onChange={handleParamChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-4 py-2"
        >
          {loading ? "Loading..." : "Get Quality Report"}
        </button>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {report && (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <h3 className="text-xl font-semibold mb-3">Quality Report</h3>
          <p><strong>Overall Grade:</strong> {report.overallGrade}</p>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {Object.entries(report.parameters).map(([key, val]) => (
              <p key={key}><strong>{key}:</strong> {val}</p>
            ))}
          </div>
          <h4 className="mt-4 font-semibold">Market Prices</h4>
          <ul className="list-disc list-inside">
            {Object.entries(report.marketPrice).map(([grade, price]) => (
              <li key={grade}>{grade.replace("_", " ").toUpperCase()}: {price}</li>
            ))}
          </ul>
          <h4 className="mt-4 font-semibold">Recommendations</h4>
          <ul className="list-disc list-inside">
            {report.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
          {report.certificationEligible && (
            <p className="mt-4 font-semibold text-green-700">Eligible for quality certification</p>
          )}
        </div>
      )}
    </div>
  );
}
