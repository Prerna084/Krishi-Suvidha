import React, { useState } from "react";
import { detectDisease as detectDiseaseService } from "../services/diseaseDetectionService";

export default function DiseaseDetection({ userLocation, setUserLocation }) {
  const [cropType, setCropType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const detectDisease = async () => {
    if (!cropType || !userLocation || !imageFile) return;

    setLoading(true);
    setError(null);
    try {
      const res = await detectDiseaseService(imageFile, cropType, userLocation);
      setResults(res);
    } catch (err) {
      setError(err?.message || "Disease detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Crop Disease Detection</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Crop Type</span>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select crop</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Farm Location</span>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Enter your farm location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Upload Image of Affected Crop</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            />
          </label>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Uploaded crop for disease detection"
              className="max-w-xs max-h-52 rounded border border-gray-200"
            />
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={detectDisease}
            disabled={!cropType || !userLocation || !imageFile || loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            {loading ? "Analyzing..." : "Detect Disease"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Diagnosis Results</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              <p className="text-gray-700">
                <strong>Disease:</strong> {results.disease}
              </p>
              <p className="text-gray-700">
                <strong>Confidence:</strong> {results.confidence}
              </p>
              <p className="text-gray-700 sm:col-span-2">
                <strong>Description:</strong> {results.description}
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 text-red-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Recommended Treatment</h3>
            <ul className="list-disc list-inside space-y-1">
              {results.remedies.map((remedy, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">💊</span>
                  <span>{remedy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Preventive Measures</h3>
            <ul className="list-disc list-inside space-y-1">
              {results.preventive.map((preventive, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">🛡️</span>
                  <span>{preventive}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nearest Krishi Kendra Support</h3>
            <div className="space-y-1 text-gray-700">
              <p>
                <strong>Name:</strong> {results.krishiKendra.name}
              </p>
              <p>
                <strong>Distance:</strong> {results.krishiKendra.distance}
              </p>
              <p className="flex items-center">
                <strong>Phone:</strong>
                <a href={`tel:${results.krishiKendra.phone}`} className="text-green-700 ml-2">
                  {results.krishiKendra.phone}
                </a>
              </p>
              <p>
                <strong>Address:</strong> {results.krishiKendra.address}
              </p>
              <button
                onClick={() => (window.location.href = `tel:${results.krishiKendra.phone}`)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                📞 Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
