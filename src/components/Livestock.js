import React, { useState } from "react";
import { getLivestockAdvice } from "../services/livestockService";

export default function Livestock() {
  const [location, setLocation] = useState("");
  const [animalType, setAnimalType] = useState("cattle");
  const [count, setCount] = useState(1);
  const [healthConcerns, setHealthConcerns] = useState("");
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState("");

  async function fetchAdvice(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAdvice(null);
    try {
      const data = await getLivestockAdvice({
        location: location || "Punjab",
        animalType,
        count: Number(count) || 1,
        healthConcerns: healthConcerns || undefined,
      });
      setAdvice(data);
    } catch (err) {
      setError("Failed to fetch livestock advice. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const benefitNotes = [
    "Manure improves soil organic carbon and fertility; reduces chemical fertilizer dependence.",
    "Poultry litter can be composted with crop residues to produce high-quality vermicompost.",
    "Dung-based biogas can meet household energy needs; slurry is an excellent organic fertilizer.",
    "Integrated crop-livestock systems enhance sustainability and farm income diversification."
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Livestock & Poultry for Sustainable Farming</h2>
      <p className="text-gray-600 mb-6">Plan health, feed and economic benefits. Integrate manure and litter into organic inputs.</p>

      <form onSubmit={fetchAdvice} className="bg-white rounded-lg p-4 shadow mb-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Animal Type</label>
            <select
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="cattle">Cattle</option>
              <option value="buffalo">Buffalo</option>
              <option value="goat">Goat</option>
              <option value="sheep">Sheep</option>
              <option value="poultry">Poultry</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Count</label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Health Concerns (optional)</label>
            <input
              type="text"
              value={healthConcerns}
              onChange={(e) => setHealthConcerns(e.target.value)}
              placeholder="e.g., vaccination due, diarrhoea"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-4 py-2"
        >
          {loading ? "Loading..." : "Get Livestock Plan"}
        </button>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {advice && (
        <div className="space-y-6">
          <section className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-3">Health Schedule</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {advice.healthSchedule?.vaccination && <li>Vaccination: {advice.healthSchedule.vaccination}</li>}
              {advice.healthSchedule?.deworming && <li>Deworming: {advice.healthSchedule.deworming}</li>}
              {advice.healthSchedule?.healthCheckup && <li>Checkup: {advice.healthSchedule.healthCheckup}</li>}
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-3">Feed Recommendations</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {(advice.feedRecommendations || []).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </section>

          {advice.breeding && (
            <section className="bg-white border border-gray-200 rounded p-4">
              <h3 className="text-xl font-semibold mb-2">Breeding</h3>
              <p className="text-gray-700"><strong>Next Cycle:</strong> {advice.breeding.nextCycle}</p>
              <p className="text-gray-700"><strong>Recommendations:</strong> {advice.breeding.recommendations}</p>
            </section>
          )}

          <section className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-3">Economic Benefits</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {(advice.economicBenefits || []).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </section>

          <section className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-3">Integrated Sustainability Notes</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {benefitNotes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
