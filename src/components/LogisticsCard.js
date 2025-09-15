import React from "react";

export default function LogisticsCard({ logistic }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{logistic.name}</h3>
          <p className="text-gray-700">📦 Service: {logistic.type}</p>
          <p className="text-gray-700">⚖️ Capacity: {logistic.capacity}</p>
          <p className="text-gray-700">💰 Rate: {logistic.price}</p>
          <p className="text-gray-700">⭐ Rating: {logistic.rating}/5</p>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => alert(`Booking ${logistic.name}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
          >
            📋 Book Now
          </button>
          <button
            onClick={() => alert(`Contacting ${logistic.name}`)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded"
          >
            📞 Contact
          </button>
        </div>
      </div>
    </div>
  );
}
