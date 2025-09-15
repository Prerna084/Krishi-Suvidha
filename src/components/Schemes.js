import React, { useState } from "react";
import { getGovernmentSchemes } from "../services/schemesService";

const CATEGORIES = [
  "all",
  "subsidy",
  "credit",
  "insurance",
  "mechanization",
  "irrigation",
  "organic",
  "training",
  "market-linkage",
  "price-support",
  "FPO/FPC",
  "processing",
  "renewable-energy",
  "soil-health",
  "advisory",
  "horticulture",
  "livestock",
];

const STATES = [
  "Punjab",
  "Haryana",
  "Rajasthan",
  "Uttar Pradesh",
  "Delhi",
  "Gujarat",
  "Maharashtra",
  "Madhya Pradesh",
];

function SchemeCard({ scheme }) {
  if (!scheme) return null;
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
      <h4 className="text-lg font-semibold text-gray-900">{scheme.name}</h4>
      {scheme.department && (
        <p className="text-gray-700 mt-1">
          <strong>Department:</strong> {scheme.department}
        </p>
      )}
      {scheme.description && <p className="text-gray-700 mt-2">{scheme.description}</p>}

      {Array.isArray(scheme.benefits) && scheme.benefits.length > 0 && (
        <>
          <p className="text-gray-900 font-medium mt-3">Benefits:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {scheme.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </>
      )}

      {scheme.eligibility && (
        <p className="text-gray-700 mt-2">
          <strong>Eligibility:</strong> {scheme.eligibility}
        </p>
      )}

      {Array.isArray(scheme.documents) && scheme.documents.length > 0 && (
        <p className="text-gray-700 mt-2">
          <strong>Documents:</strong> {scheme.documents.join(", ")}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {scheme.applicationLink && (
          <a
            href={scheme.applicationLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
          >
            Apply / Learn More
          </a>
        )}
        {scheme.contact && (
          <span className="text-gray-600">
            <strong>Contact:</strong> {scheme.contact}
          </span>
        )}
        {scheme.lastUpdated && <span className="text-gray-500">(Updated: {scheme.lastUpdated})</span>}
      </div>
    </div>
  );
}

export default function Schemes() {
  const [filters, setFilters] = useState({
    state: "Punjab",
    category: "all",
    q: "",
    page: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    centralSchemes: [],
    stateSchemes: [],
    totals: { central: 0, state: 0 },
    notes: "",
  });

  const onChange = (field) => (e) => {
    const value = field === "page" || field === "pageSize" ? Number(e.target.value) : e.target.value;
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      ...(field !== "page" ? { page: 1 } : {}),
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        state: filters.state,
        page: filters.page,
        pageSize: filters.pageSize,
      };
      if (filters.q && filters.q.trim()) payload.q = filters.q.trim();
      if (filters.category && filters.category !== "all") payload.category = filters.category;

      const res = await getGovernmentSchemes(payload);
      setData({
        centralSchemes: Array.isArray(res.centralSchemes) ? res.centralSchemes : [],
        stateSchemes: Array.isArray(res.stateSchemes) ? res.stateSchemes : [],
        totals: res.totals || { central: 0, state: 0 },
        notes: res.notes || "",
      });
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const totalResults = (data.totals?.central || 0) + (data.totals?.state || 0);
  const hasPrev = filters.page > 1;
  const hasNext = totalResults > filters.page * filters.pageSize;

  const goPrev = () => {
    if (hasPrev) setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const goNext = () => {
    if (hasNext) setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Government Schemes (Central + State)</h2>
      <p className="text-gray-600 mb-4">
        Discover government schemes for farmers. Use filters to narrow by state, category, and search keywords.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">State</span>
            <select
              value={filters.state}
              onChange={onChange("state")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Category</span>
            <select
              value={filters.category}
              onChange={onChange("category")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Search</span>
            <input
              type="text"
              value={filters.q}
              onChange={onChange("q")}
              placeholder="e.g. subsidy, insurance, machinery, solar"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Page Size</span>
            <select
              value={filters.pageSize}
              onChange={onChange("pageSize")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Search Schemes"}
          </button>
          <span className="text-gray-600">
            Page {filters.page} • Showing up to {filters.pageSize} per page • Total found: {totalResults}
          </span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={goPrev}
              disabled={!hasPrev || loading}
              className="bg-gray-200 hover:bg-gray-300 disabled:opacity-60 px-3 py-2 rounded"
            >
              &laquo; Prev
            </button>
            <button
              onClick={goNext}
              disabled={!hasNext || loading}
              className="bg-gray-800 hover:bg-gray-900 disabled:opacity-60 text-white px-3 py-2 rounded"
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Error</h3>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {data.notes && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700">
            <strong>Note:</strong> {data.notes}
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Central Government Schemes ({data.totals?.central || 0})
        </h3>
        {loading ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p>Loading...</p>
          </div>
        ) : (data.centralSchemes || []).length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.centralSchemes.map((s, i) => (
              <SchemeCard key={i} scheme={s} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p>No central schemes found for these filters.</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {filters.state} State Schemes ({data.totals?.state || 0})
        </h3>
        {loading ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p>Loading...</p>
          </div>
        ) : (data.stateSchemes || []).length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.stateSchemes.map((s, i) => (
              <SchemeCard key={i} scheme={s} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p>No state schemes found for these filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
