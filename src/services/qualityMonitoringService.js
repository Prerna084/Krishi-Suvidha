import { post } from "./api";

/**
 * Get a post-harvest quality report for a crop lot.
 * @param {Object} payload
 * @param {string} payload.location
 * @param {string} payload.cropType
 * @param {string} [payload.harvestDate] - ISO date string
 * @param {Object} [payload.qualityParameters] - Optional sensor/lab inputs
 * @returns {Promise<{
 *   overallGrade: string,
 *   parameters: Record<string,string>,
 *   marketPrice: Record<string,string>,
 *   recommendations: string[],
 *   certificationEligible: boolean
 * }>}
 */
export async function getQualityReport(payload) {
  return post("quality-monitoring", payload || {});
}
