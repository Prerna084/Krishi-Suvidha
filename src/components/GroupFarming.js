import React, { useState } from "react";
import { getGroupFarmingInfo, createGroupInitiative } from "../services/groupFarmingService";

export default function GroupFarming({ userLocation, setUserLocation }) {
  // Info state
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [infoError, setInfoError] = useState(null);
  const [info, setInfo] = useState({ nearbyGroups: [], benefits: [], governmentSupport: [] });

  // Form state
  const [form, setForm] = useState({
    groupName: "",
    cropType: "",
    landArea: "",
    coordinatorContact: "",
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createResponse, setCreateResponse] = useState(null);

  // Handlers
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (e) => {
    setUserLocation(e.target.value);
  };

  // Load groups/benefits/support for a location
  const loadInfo = async () => {
    if (!userLocation) return;
    setLoadingInfo(true);
    setInfoError(null);
    try {
      const data = await getGroupFarmingInfo(userLocation);
      const nearbyGroups = Array.isArray(data?.nearbyGroups) ? data.nearbyGroups : [];
      const benefits = Array.isArray(data?.benefits) ? data.benefits : [];
      const governmentSupport = Array.isArray(data?.governmentSupport) ? data.governmentSupport : [];
      setInfo({ nearbyGroups, benefits, governmentSupport });
    } catch (e) {
      setInfoError(e?.response?.data?.error || e.message || "Failed to load group farming info");
    } finally {
      setLoadingInfo(false);
    }
  };

  // Submit a new initiative
  const submitInitiative = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateResponse(null);

    if (!form.groupName || !userLocation || !form.cropType || !form.landArea || !form.coordinatorContact) {
      setCreateError("All fields are required.");
      return;
    }

    setCreating(true);
    try {
      const payload = {
        groupName: form.groupName,
        location: userLocation,
        cropType: form.cropType,
        landArea: form.landArea,
        coordinatorContact: form.coordinatorContact,
      };
      const res = await createGroupInitiative(payload);
      setCreateResponse(res);
      // Refresh info after creating
      await loadInfo();
      // Reset form
      setForm({
        groupName: "",
        cropType: "",
        landArea: "",
        coordinatorContact: "",
      });
    } catch (e) {
      setCreateError(e?.response?.data?.error || e.message || "Failed to create group initiative");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Group Farming</h2>
        <p className="text-gray-600 mb-3">
          Group farming enables smallholders to pool land and resources to access machinery and better technology, lowering costs and improving incomes.
        </p>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Your Location</span>
            <input
              type="text"
              value={userLocation || ""}
              onChange={handleLocationChange}
              placeholder="e.g., Rampur, Jaipur"
              className="w-full border rounded px-3 py-2"
            />
          </label>
          <button
            onClick={loadInfo}
            disabled={loadingInfo || !userLocation}
            className={`px-4 py-2 rounded text-white ${loadingInfo || !userLocation ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loadingInfo ? "Loading..." : "Load Info"}
          </button>
        </div>

        {infoError && (
          <div className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">
            {String(infoError)}
          </div>
        )}
      </div>

      {/* Nearby groups */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-3">Nearby Groups</h3>
        {Array.isArray(info.nearbyGroups) && info.nearbyGroups.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {info.nearbyGroups.map((g, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="font-semibold text-green-700">{g.name || "Group"}</div>
                <div className="text-sm text-gray-600">{g.location || "-"}</div>
                <div className="mt-2 text-sm">
                  <div><span className="font-medium">Members:</span> {g.members ?? "-"}</div>
                  <div><span className="font-medium">Crops:</span> {Array.isArray(g.crops) ? g.crops.join(", ") : (g.crops || "-")}</div>
                  <div><span className="font-medium">Land Area:</span> {g.landArea || "-"}</div>
                  <div><span className="font-medium">Coordinator:</span> {g.coordinator || "-"}</div>
                  {g.achievements && (
                    <div className="mt-1 text-xs text-gray-700">
                      <span className="font-medium">Achievements:</span> {g.achievements}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Enter your location and click "Load Info" to see nearby groups.</p>
        )}
      </div>

      {/* Benefits and Government Support */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Benefits of Group Farming</h3>
          <ul className="list-disc list-inside space-y-1">
            {(info.benefits || []).map((b, i) => (<li key={i}>{b}</li>))}
          </ul>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Government Support</h3>
          <ul className="list-disc list-inside space-y-1">
            {(info.governmentSupport || []).map((g, i) => (<li key={i}>{g}</li>))}
          </ul>
        </div>
      </div>

      {/* Create/Join a Group Initiative */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-3">Create/Join a Group Initiative</h3>
        <form onSubmit={submitInitiative} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-medium mb-1">Group Name</span>
              <input
                type="text"
                value={form.groupName}
                onChange={handleChange("groupName")}
                placeholder="e.g., Progressive Farmers Group"
                className="w-full border rounded px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1">Crop Type</span>
              <input
                type="text"
                value={form.cropType}
                onChange={handleChange("cropType")}
                placeholder="e.g., Wheat, Mustard"
                className="w-full border rounded px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1">Land Area</span>
              <input
                type="text"
                value={form.landArea}
                onChange={handleChange("landArea")}
                placeholder="e.g., 50 acres"
                className="w-full border rounded px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1">Coordinator Contact</span>
              <input
                type="text"
                value={form.coordinatorContact}
                onChange={handleChange("coordinatorContact")}
                placeholder="+91-XXXXXXXXXX"
                className="w-full border rounded px-3 py-2"
              />
            </label>
          </div>

          {createError && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">
              {String(createError)}
            </div>
          )}

          <button
            type="submit"
            disabled={creating}
            className={`px-4 py-2 rounded text-white ${creating ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {creating ? "Submitting..." : "Create Initiative"}
          </button>

          {createResponse && (
            <div className="mt-4 rounded border border-green-200 bg-green-50 p-4">
              <h4 className="text-green-800 font-semibold mb-1">Initiative Created</h4>
              <p className="text-sm"><strong>Group ID:</strong> {createResponse.groupId}</p>
              <p className="mt-1">{createResponse.message}</p>
              {Array.isArray(createResponse.benefits) && createResponse.benefits.length > 0 && (
                <>
                  <h5 className="mt-2 font-medium">Benefits</h5>
                  <ul className="list-disc list-inside">
                    {createResponse.benefits.map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                </>
              )}
              {Array.isArray(createResponse.nextSteps) && createResponse.nextSteps.length > 0 && (
                <>
                  <h5 className="mt-2 font-medium">Next Steps</h5>
                  <ul className="list-disc list-inside">
                    {createResponse.nextSteps.map((s, i) => (<li key={i}>{s}</li>))}
                  </ul>
                </>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
