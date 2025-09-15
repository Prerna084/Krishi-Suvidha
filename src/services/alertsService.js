import { get } from "./api";

/**
 * Fetch seasonal disease and pest alerts, including post-harvest alerts.
 * @param {Object} params
 * @param {string} params.location - Location name or district
 * @param {string} [params.cropType] - Optional crop type filter
 * @returns {Promise<{
 *   currentAlerts: Array<any>,
 *   seasonalForecast: string[],
 *   postHarvestAlerts?: Array<any>,
 *   preventiveMeasures?: string[]
 * }>}
 */
export async function getDiseaseAlerts({ location, cropType } = {}) {
  const loc = encodeURIComponent(location || "");
  const crop = cropType ? `&cropType=${encodeURIComponent(cropType)}` : "";
  return get(`disease-alerts?location=${loc}${crop}`);
}
