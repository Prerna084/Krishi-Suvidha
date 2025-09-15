import React from "react";

export default function KrishiKendraCard({ kendra }) {
  // Graceful fallback for missing data
  if (!kendra) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
        <p>Loading Krishi Kendra information...</p>
      </div>
    );
  }

  const services = Array.isArray(kendra.services) ? kendra.services : [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{kendra.name || "Krishi Kendra"}</h3>
          <p className="text-gray-700">📍 {kendra.distance || "Distance not available"} away</p>
          <p className="text-gray-700">🏢 Address: {kendra.address || "Address not available"}</p>
          <p className="text-gray-700">📞 Phone: {kendra.phone || "Phone not available"}</p>
          <p className="text-gray-700">⭐ Rating: {kendra.rating || "N/A"}/5</p>

          <div className="mt-2">
            <strong className="text-gray-900">Services:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-700 border border-green-200"
                  >
                    {service}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">No services listed</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => (window.location.href = `tel:${kendra.phone}`)}
            disabled={!kendra.phone}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 py-2 rounded"
          >
            📞 Call Now
          </button>
          <button
            onClick={() => alert(`Getting directions to ${kendra.name || "this location"}`)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded"
          >
            🗺️ Directions
          </button>
        </div>
      </div>
    </div>
  );
}
