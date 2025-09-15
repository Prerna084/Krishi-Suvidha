import { post } from "./api";

/**
 * Get livestock and poultry management advice and economic benefits.
 * @param {Object} payload
 * @param {string} payload.location
 * @param {string} payload.animalType - e.g., "cattle", "buffalo", "goat", "poultry"
 * @param {number} [payload.count]
 * @param {string} [payload.healthConcerns]
 * @returns {Promise<{
 *  healthSchedule: { vaccination: string, deworming: string, healthCheckup: string },
 *  feedRecommendations: string[],
 *  breeding: { nextCycle: string, recommendations: string },
 *  economicBenefits: string[]
 * }>}
 */
export async function getLivestockAdvice(payload) {
  return post("livestock", payload || {});
}
