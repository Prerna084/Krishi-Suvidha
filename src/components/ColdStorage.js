import React, { useMemo, useState } from "react";
import { fetchColdStorage } from "../services/coldStorageService";

function parsePricePerKg(priceStr) {
  // Expect formats like "₹2/kg/month" or "Rs. 1.5/kg/month"
  if (!priceStr) return null;
  const m = String(priceStr).replace(/,/g, "").match(/([₹Rs\. ]+)?\s*([\d.]+)\s*\/\s*kg/i);
  if (!m) return null;
  const val = parseFloat(m[2]);
  return isNaN(val) ? null : val;
}

function formatINR(amount) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);
  } catch {
    return `₹${amount.toFixed(2)}`;
  }
}

export default function ColdStorage() {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState(""); // numeric
  const [unit, setUnit] = useState("tons"); // "tons" | "kg"
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("price"); // "price" | "distance" | "available"

  const totalKg = useMemo(() => {
    const q = parseFloat(quantity);
    if (isNaN(q) || q <= 0) return 0;
    return unit === "kg" ? q : q * 1000;
  }, [quantity, unit]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await fetchColdStorage({
        location: location || undefined,
        cropType: cropType || undefined,
        quantity: quantity || undefined,
      });
      setResult(data);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Failed to fetch cold storage options");
    } finally {
      setLoading(false);
    }
  }

  function estimateCost(pricingStr) {
    const perKg = parsePricePerKg(pricingStr);
    if (perKg == null || !totalKg) return null;
    const total = perKg * totalKg;
    return { perKg, monthly: total };
  }

  function parseDistanceKm(distanceStr) {
    if (!distanceStr) return null;
    const m = String(distanceStr).match(/([\d.]+)\s*km/i);
    if (!m) return null;
    const v = parseFloat(m[1]);
    return isNaN(v) ? null : v;
  }

  function parseAvailableSpace(availableStr) {
    if (!availableStr) return null;
    // Expect like "150 tons"
    const m = String(availableStr).match(/([\d.]+)\s*(tons|ton|t)/i);
    if (!m) return null;
    const v = parseFloat(m[1]);
    return isNaN(v) ? null : v;
    // If units were in kg in future, add conversion
  }

  const facilities = useMemo(() => {
    const list = Array.isArray(result?.nearbyFacilities) ? result.nearbyFacilities.slice() : [];
    // Attach computed metrics for sorting
    const enriched = list.map((f) => {
      const est = estimateCost(f.pricing);
      const distKm = parseDistanceKm(f.distance);
      const availTons = parseAvailableSpace(f.availableSpace);
      return { ...f, _estPerKg: est?.perKg ?? null, _estMonthly: est?.monthly ?? null, _distKm: distKm, _availTons: availTons };
    });
    if (sortBy === "price") {
      enriched.sort((a, b) => {
        const ap = a._estPerKg ?? Infinity;
        const bp = b._estPerKg ?? Infinity;
        return ap - bp;
      });
    } else if (sortBy === "distance") {
      enriched.sort((a, b) => {
        const ad = a._distKm ?? Infinity;
        const bd = b._distKm ?? Infinity;
        return ad - bd;
      });
    } else if (sortBy === "available") {
      enriched.sort((a, b) => {
        const aa = a._availTons ?? -Infinity;
        const ba = b._availTons ?? -Infinity;
        return ba - aa;
      });
    }
    return enriched;
  }, [result, sortBy, quantity, unit]);

  const ppp = result?.pppModel;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Cold Storage Finder</h2>
      <p className="text-gray-600 mb-6">
        Find nearby cold storage facilities, estimate monthly storage costs, and view PPP program details.
      </p>

      <form onSubmit={onSubmit} className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Ludhiana"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="md:col-span-2">
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
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="pulses">Pulses</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
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
          <div>
            <label className="block mb-1 font-medium">Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className="border rounded px-3 py-2 w-full bg-white">
              <option value="tons">Tons</option>
              <option value="kg">Kg</option>
            </select>
          </div>
          <div className="md:col-span-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-5 py-2"
            >
              {loading ? "Finding storage..." : "Find Storage"}
            </button>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 bg-white"
              >
                <option value="price">Price (₹/kg)</option>
                <option value="distance">Distance</option>
                <option value="available">Available Space</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {facilities.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Nearby Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((f, i) => {
              const est = estimateCost(f.pricing);
              return (
                <div key={i} className="border rounded p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">{f.name}</h4>
                    <span className="text-sm text-gray-700">{f.distance}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-1">
                    <strong>Capacity:</strong> {f.capacity} • <strong>Available:</strong> {f.availableSpace}
                  </p>
                  <p className="text-gray-700 text-sm mb-1">
                    <strong>Temperature:</strong> {f.temperatureRange} • <strong>Pricing:</strong> {f.pricing}
                  </p>
                  {Array.isArray(f.specialization) && f.specialization.length > 0 && (
                    <p className="text-gray-700 text-sm mb-1">
                      <strong>Specialization:</strong> {f.specialization.join(", ")}
                    </p>
                  )}
                  {Array.isArray(f.facilities) && f.facilities.length > 0 && (
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Facilities:</strong> {f.facilities.join(", ")}
                    </p>
                  )}

                  {totalKg > 0 && est && (
                    <div className="bg-green-50 border border-green-200 rounded p-2 text-sm mb-2">
                      <p className="text-gray-800">
                        Estimated monthly cost ({formatINR(est.perKg)}/kg × {totalKg.toLocaleString()} kg):{" "}
                        <strong>{formatINR(est.monthly)}</strong>
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() =>
                        alert(
                          `Contact ${f.name}\nPhone: ${f.contact || "N/A"}\nFor booking and availability.\nRecommended to confirm pricing and temperature range for ${cropType || "your crop"}.`
                        )
                      }
                    >
                      Contact
                    </button>
                    <button
                      className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded text-sm"
                      onClick={() =>
                        alert(
                          `Directions request to ${f.name} (${f.distance || "distance N/A"})\nPlease use your maps app with the facility name.`
                        )
                      }
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {ppp && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">PPP Model (Public-Private Partnership)</h3>
          {ppp.description && <p className="text-gray-700 mb-2">{ppp.description}</p>}
          {Array.isArray(ppp.benefits) && ppp.benefits.length > 0 && (
            <>
              <p className="text-gray-800 font-medium">Benefits:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2">
                {ppp.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-gray-800">
            {ppp.investmentRequired && <p><strong>Investment:</strong> {ppp.investmentRequired}</p>}
            {ppp.roi && <p><strong>ROI:</strong> {ppp.roi}</p>}
            {ppp.contactForDetails && <p><strong>Contact:</strong> {ppp.contactForDetails}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
