import React, { useState } from "react";
import { bookDroneService } from "../services/droneService";

export default function DroneServices() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [area, setArea] = useState("");
  const [pestType, setPestType] = useState("");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState("");

  async function fetchServices(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOffer(null);
    try {
      const data = await bookDroneService({
        location: location || "Punjab",
        cropType: cropType || "General",
        area: area || 1,
        pestType: pestType || undefined,
      });
      setOffer(data);
    } catch (err) {
      setError("Failed to fetch drone services. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Drone Services for Organic Spraying</h2>
      <p className="text-gray-600 mb-6">Check availability, costs, and recommended organic chemicals for drone-based spraying.</p>

      <form onSubmit={fetchServices} className="bg-white rounded-lg p-4 shadow mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div>
            <label className="block mb-1 font-medium">Crop Type</label>
            <input
              type="text"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              placeholder="e.g., Wheat, Rice"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Area (acres)</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Target Pest/Disease (optional)</label>
            <input
              type="text"
              value={pestType}
              onChange={(e) => setPestType(e.target.value)}
              placeholder="e.g., Aphids, Blight"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-4 py-2"
        >
          {loading ? "Loading..." : "Check Availability"}
        </button>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {offer && (
        <div className="space-y-6">
          <section className="bg-white border border-gray-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-3">Available Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(offer.availableServices || []).map((s, i) => (
                <div key={i} className="rounded border p-3">
                  <p className="font-medium">{s.service}</p>
                  <p className="text-gray-700 text-sm"><strong>Coverage:</strong> {s.coverage}</p>
                  <p className="text-gray-700 text-sm"><strong>Cost:</strong> {s.cost}</p>
                  {Array.isArray(s.chemicals) && (
                    <p className="text-gray-700 text-sm"><strong>Organic Options:</strong> {s.chemicals.join(", ")}</p>
                  )}
                  {Array.isArray(s.types) && (
                    <p className="text-gray-700 text-sm"><strong>Types:</strong> {s.types.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Booking Info</h3>
            <p className="text-gray-700"><strong>Next Available:</strong> {offer.booking?.nextAvailable}</p>
            <p className="text-gray-700"><strong>Duration:</strong> {offer.booking?.duration}</p>
            <p className="text-gray-700"><strong>Requirements:</strong> {offer.booking?.requirements}</p>
          </section>

          <section className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Benefits</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {(offer.benefits || []).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
