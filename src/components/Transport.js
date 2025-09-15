import React, { useState } from "react";
import { requestTransport } from "../services/transportService";

export default function Transport() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const payload = {
        fromLocation: fromLocation.trim(),
        toLocation: toLocation.trim(),
        cropType: cropType || undefined,
        quantity: quantity || undefined,
        date: date || undefined,
      };
      if (!payload.fromLocation || !payload.toLocation) {
        throw new Error("Please fill From and To locations");
      }
      const res = await requestTransport(payload);
      setResult(res);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Failed to fetch transport options");
    } finally {
      setLoading(false);
    }
  }

  const vehicles = Array.isArray(result?.availableVehicles) ? result.availableVehicles : [];
  const shared = result?.sharedTransport;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Shared Transport</h2>
      <p className="text-gray-600 mb-6">
        Reduce logistics costs by sharing transportation with nearby farmers. Find vehicles and shared routes.
      </p>

      <form onSubmit={onSubmit} className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">From</label>
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="e.g., Ludhiana"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">To</label>
            <input
              type="text"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              placeholder="e.g., Delhi Mandi"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Crop (optional)</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="border rounded px-3 py-2 w-full bg-white"
            >
              <option value="">Select</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="mustard">Mustard</option>
              <option value="gram">Gram</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity (tons, optional)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 5"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="md:col-span-5">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-5 py-2"
            >
              {loading ? "Finding options..." : "Find Transport"}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {vehicles.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Available Vehicles</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="py-2 px-3 text-left">Vehicle</th>
                  <th className="py-2 px-3 text-left">Driver</th>
                  <th className="py-2 px-3 text-left">Contact</th>
                  <th className="py-2 px-3 text-right">Price/km</th>
                  <th className="py-2 px-3 text-right">Avail. Space</th>
                  <th className="py-2 px-3 text-left">Route</th>
                  <th className="py-2 px-3 text-left">Departure</th>
                  <th className="py-2 px-3 text-right">Est. Cost</th>
                  <th className="py-2 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{v.vehicleType}</td>
                    <td className="py-2 px-3">{v.driver}</td>
                    <td className="py-2 px-3">{v.contact}</td>
                    <td className="py-2 px-3 text-right">{v.pricePerKm}</td>
                    <td className="py-2 px-3 text-right">{v.availableSpace}</td>
                    <td className="py-2 px-3">{v.route}</td>
                    <td className="py-2 px-3">{v.departureTime}</td>
                    <td className="py-2 px-3 text-right">{v.estimatedCost}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() => alert(`Contact ${v.driver} at ${v.contact} for booking`)}
                      >
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {shared && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Shared Transport Benefits</h3>
          {shared.description && <p className="text-gray-700 mb-2">{shared.description}</p>}
          {Array.isArray(shared.benefits) && shared.benefits.length > 0 && (
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
              {shared.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
          {shared.groupBooking && (
            <div className="bg-white rounded p-3 shadow-sm">
              <p className="text-gray-800">
                <strong>Group Booking:</strong> Min Qty: {shared.groupBooking.minimumQuantity}, Discount: {shared.groupBooking.discount}
              </p>
              <p className="text-gray-800">
                <strong>Coordinator:</strong> {shared.groupBooking.coordinatorContact}
              </p>
              <div className="mt-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                  onClick={() =>
                    alert(
                      `Requesting group booking from ${fromLocation || "your area"} to ${toLocation || "destination"}.\n` +
                      `Contact coordinator at ${shared.groupBooking.coordinatorContact}.`
                    )
                  }
                >
                  Request Group Booking
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
