import React, { useState } from "react";
import BuyerCard from "./BuyerCard";
import LogisticsCard from "./LogisticsCard";
import { fetchBuyers, listCropForSale } from "../services/marketplaceService";

const mockLogistics = [
  { id: 1, name: "AgroTrans Logistics", type: "Local Truckers", capacity: "5 Tons", rating: "4.7", price: "₹3/km" },
  { id: 2, name: "Farmers Freight", type: "Shared Transport", capacity: "3 Tons", rating: "4.5", price: "₹2.5/km" },
  { id: 3, name: "GreenField Transport", type: "Storage & Transport", capacity: "10 Tons", rating: "4.8", price: "₹4/km" }
];

export default function Marketplace({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLogistics, setShowLogistics] = useState(false);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [listResponse, setListResponse] = useState(null);

  const findBuyers = async () => {
    if (!cropType || !quantity || !userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchBuyers(cropType, userLocation);
      const list = Array.isArray(res?.buyers) ? res.buyers : [];
      setBuyers(list);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to fetch buyers");
    } finally {
      setLoading(false);
    }
  };

  const listMyCrop = async () => {
    if (!cropType || !quantity || !userLocation || !price || !contact) return;
    setLoading(true);
    setError(null);
    setListResponse(null);
    try {
      const res = await listCropForSale({
        cropType,
        quantity: Number(quantity),
        location: userLocation,
        price,
        contact
      });
      setListResponse(res);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to list crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Marketplace - Connect Directly with Buyers</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Sell Your Produce</h3>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Crop Type</span>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select crop type</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Quantity (Quintal)</span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Your Location</span>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Enter your location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Expected Price (e.g., ₹2500/Quintal)</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter expected price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Contact Number</span>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+91-XXXXXXXXXX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={findBuyers}
            disabled={!cropType || !quantity || !userLocation || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Find Buyers"}
          </button>
          <button
            onClick={listMyCrop}
            disabled={!cropType || !quantity || !userLocation || !price || !contact || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            {loading ? "Listing..." : "List My Crop"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {listResponse && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-1">Listing Created</h3>
          <p>{listResponse.message || "Your crop has been listed successfully."}</p>
          {Array.isArray(listResponse.tips) && (
            <ul className="list-disc list-inside mt-2 space-y-1">
              {listResponse.tips.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {buyers.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Buyers</h3>
          <div className="space-y-4">
            {buyers.map((buyer) => (
              <BuyerCard key={buyer.id} buyer={buyer} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Transportation Logistics</h3>
          <button
            onClick={() => setShowLogistics(!showLogistics)}
            className="text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded"
          >
            {showLogistics ? "Hide" : "Show"} Logistics Options
          </button>
        </div>

        {showLogistics && (
          <div className="mt-4 space-y-4">
            {mockLogistics.map((logistic) => (
              <LogisticsCard key={logistic.id} logistic={logistic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
