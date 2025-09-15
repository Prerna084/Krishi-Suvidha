import React, { useEffect, useState } from "react";
import { getVermicompostGuide } from "../services/vermicompostService";

export default function Vermicompost() {
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getVermicompostGuide();
        setGuide(data);
      } catch (e) {
        setError("Failed to load vermicompost guide. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Vermicompost & Organic Pesticides</h2>
      <p className="text-gray-600 mb-6">
        Step-by-step guide for vermicompost production and using farm waste (including cattle/poultry excreta) for organic inputs. Includes drone spray guidelines.
      </p>

      {loading && <div className="text-gray-700">Loading...</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      {guide && (
        <div className="space-y-8">
          {/* Process steps */}
          <section className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-3">Process</h3>
            <ol className="space-y-3 list-decimal list-inside">
              {(guide.process || []).map((s, i) => (
                <li key={i} className="bg-gray-50 rounded p-3 border border-gray-200">
                  <p className="font-medium">{s.title}</p>
                  {s.description && <p className="text-gray-700">{s.description}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 mt-2">
                    {s.duration && <p><strong>Duration:</strong> {s.duration}</p>}
                    {s.tips && <p><strong>Tips:</strong> {s.tips}</p>}
                    {s.maintenance && <p><strong>Maintenance:</strong> {s.maintenance}</p>}
                    {s.yield && <p><strong>Yield:</strong> {s.yield}</p>}
                  </div>
                  {Array.isArray(s.materials) && s.materials.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Materials:</p>
                      <ul className="list-disc list-inside text-gray-700 text-sm">
                        {s.materials.map((m, k) => <li key={k}>{m}</li>)}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Benefits and Economics */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="text-xl font-semibold mb-3">Benefits</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {(guide.benefits || []).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-xl font-semibold mb-3">Economic Value</h3>
              <ul className="text-gray-700 space-y-1">
                {guide.economicValue?.productionCost && <li><strong>Production Cost:</strong> {guide.economicValue.productionCost}</li>}
                {guide.economicValue?.marketPrice && <li><strong>Market Price:</strong> {guide.economicValue.marketPrice}</li>}
                {guide.economicValue?.profitMargin && <li><strong>Profit Margin:</strong> {guide.economicValue.profitMargin}</li>}
              </ul>
            </div>
          </section>

          {/* Organic Pesticide Recipes */}
          {Array.isArray(guide.organicPesticides) && guide.organicPesticides.length > 0 && (
            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Organic Pesticide Formulations</h3>
              <div className="space-y-4">
                {guide.organicPesticides.map((rec, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-4">
                    <p className="font-medium">{rec.name || "Recipe"}</p>
                    {Array.isArray(rec.ingredients) && (
                      <>
                        <p className="text-sm mt-2 font-medium">Ingredients:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {rec.ingredients.map((ing, k) => <li key={k}>{ing}</li>)}
                        </ul>
                      </>
                    )}
                    {Array.isArray(rec.steps) && (
                      <>
                        <p className="text-sm mt-2 font-medium">Steps:</p>
                        <ol className="list-decimal list-inside text-sm text-gray-700">
                          {rec.steps.map((st, k) => <li key={k}>{st}</li>)}
                        </ol>
                      </>
                    )}
                    {rec.preparation && <p className="text-sm text-gray-700 mt-2"><strong>Preparation:</strong> {rec.preparation}</p>}
                    {rec.usage && <p className="text-sm text-gray-700"><strong>Usage:</strong> {rec.usage}</p>}
                    {rec.fermentation && <p className="text-sm text-gray-700"><strong>Fermentation:</strong> {rec.fermentation}</p>}
                    {rec.foliarSpray && <p className="text-sm text-gray-700"><strong>Foliar Spray:</strong> {rec.foliarSpray}</p>}
                    {rec.recipe && <p className="text-sm text-gray-700"><strong>Recipe:</strong> {rec.recipe}</p>}
                    {rec.caution && <p className="text-sm text-red-700 mt-1"><strong>Caution:</strong> {rec.caution}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Drone Spray Guidelines */}
          {guide.droneSprayGuidelines && (
            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Drone Spray Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium mb-2">Recommended Dilutions</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {(guide.droneSprayGuidelines.recommendedDilutions || []).map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Conditions</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {(guide.droneSprayGuidelines.conditions || []).map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Safety</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {(guide.droneSprayGuidelines.safety || []).map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
