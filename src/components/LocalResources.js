import React, { useState } from "react";
import KrishiKendraCard from "./KrishiKendraCard";
import { fetchKrishiKendras } from "../services/localResourcesService";

export default function LocalResources({ userLocation, setUserLocation }) {
  const [kendras, setKendras] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const findResources = async () => {
    if (!userLocation) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchKrishiKendras(userLocation);
      const nearest = Array.isArray(res?.nearest) ? res.nearest : [];
      const emergencies = Array.isArray(res?.emergencyContacts) ? res.emergencyContacts : [];
      setKendras(nearest);
      setEmergencyContacts(emergencies);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to load local resources");
    } finally {
      setLoading(false);
    }
  };

  const validKendras = Array.isArray(kendras) ? kendras.filter((k) => k && typeof k === "object") : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Local Resources - Krishi Kendras &amp; Support</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Your Location</span>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Enter your location to find nearest resources"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>
          <button
            onClick={findResources}
            disabled={!userLocation || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg h-10 md:h-auto"
          >
            {loading ? "Searching..." : "Find Resources"}
          </button>
        </div>

        <p className="mt-3 text-gray-600">
          {userLocation ? `Showing resources near: ${userLocation}` : "Enter location to see nearby resources"}
        </p>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Krishi Kendras &amp; Agricultural Centers</h3>
        {loading ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">Loading resources...</p>
          </div>
        ) : validKendras.length > 0 ? (
          <div className="space-y-4">
            {validKendras.map((kendra, idx) => (
              <KrishiKendraCard key={kendra.id || idx} kendra={kendra} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p>No Krishi Kendras found. Enter your location and click "Find Resources".</p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Resources</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(emergencyContacts) && emergencyContacts.length > 0 ? (
            emergencyContacts.map((c, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900">{c.service || "Emergency Service"}</h4>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {c.phone}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="bg-red-50 border border-red-200 text-red-900 rounded-lg p-4">
                <h4 className="font-semibold">🆘 Crop Emergency Helpline</h4>
                <p>24/7 support for urgent crop issues</p>
                <p>
                  <strong>Phone: +91-1800-123-4567</strong>
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900">🌦️ Weather Alert Subscription</h4>
                <p className="text-gray-700">Get severe weather warnings via SMS</p>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Subscribe Now
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg p-4">
                <h4 className="font-semibold">👨‍🌾 Expert Consultation</h4>
                <p>Schedule a call with agricultural experts</p>
                <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Book Consultation
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
