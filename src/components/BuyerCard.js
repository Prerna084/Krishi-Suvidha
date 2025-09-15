import React from "react";

export default function BuyerCard({ buyer }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{buyer.name}</h3>
          <p className="text-gray-700">📍 {buyer.distance} away</p>
          <p className="text-gray-700">🌾 Crops: {buyer.crop}</p>
          <p className="text-gray-700">💰 Price: {buyer.price}</p>
          <p className="text-gray-700">⭐ Rating: {buyer.rating}/5</p>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => alert(`Contacting ${buyer.name}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
          >
            📞 Contact
          </button>
          <button
            onClick={() => alert(`Negotiating with ${buyer.name}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            💬 Negotiate
          </button>
        </div>
      </div>
    </div>
  );
}
