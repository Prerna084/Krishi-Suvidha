import { get } from "./api";

/**
 * Fetch cold storage options and PPP model details.
 * @param {Object} params
 * @param {string} [params.location]
 * @param {string} [params.cropType]
 * @param {string|number} [params.quantity]
 * @returns {Promise<{
 *   nearbyFacilities: Array<{
 *     name:string, distance:string, capacity:string, availableSpace:string,
 *     temperatureRange:string, pricing:string, contact:string,
 *     specialization:string[], facilities:string[]
 *   }>,
 *   pppModel: {
 *     description:string, benefits:string[], investmentRequired:string,
 *     roi:string, contactForDetails:string
 *   }
 * }>}
 */
export async function fetchColdStorage({ location, cropType, quantity } = {}) {
  const params = new URLSearchParams();
  if (location) params.set("location", location);
  if (cropType) params.set("cropType", cropType);
  if (quantity) params.set("quantity", String(quantity));
  const qs = params.toString();
  return get(qs ? `cold-storage?${qs}` : "cold-storage");
}
