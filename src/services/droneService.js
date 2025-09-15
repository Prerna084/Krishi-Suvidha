import { post } from "./api";

/**
 * Book or fetch available drone services for organic pesticide spraying and more.
 * @param {Object} payload
 * @param {string} payload.location
 * @param {string} payload.cropType
 * @param {number|string} payload.area - Area to cover (acres)
 * @param {string} [payload.pestType]
 * @returns {Promise<{
 *  availableServices: Array<{service:string, coverage:string, cost:string, chemicals?:string[], types?:string[]}>,
 *  booking: { nextAvailable:string, duration:string, requirements:string },
 *  benefits: string[]
 * }>}
 */
export async function bookDroneService(payload) {
  return post("drone-services", payload || {});
}
