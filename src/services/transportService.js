import { post } from "./api";

/**
 * Request shared transport options.
 * @param {Object} payload
 * @param {string} payload.fromLocation
 * @param {string} payload.toLocation
 * @param {string} [payload.cropType]
 * @param {number|string} [payload.quantity]
 * @param {string} [payload.date] - ISO date string
 * @returns {Promise<{
 *   availableVehicles: Array<{
 *     id:number, vehicleType:string, driver:string, contact:string,
 *     pricePerKm:string, availableSpace:string|number, route:string,
 *     departureTime:string, estimatedCost:string
 *   }>,
 *   sharedTransport: {
 *     description:string,
 *     benefits:string[],
 *     groupBooking:{ minimumQuantity:string, discount:string, coordinatorContact:string }
 *   }
 * }>}
 */
export async function requestTransport(payload) {
  if (!payload || !payload.fromLocation || !payload.toLocation) {
    throw new Error("fromLocation and toLocation are required");
  }
  return post("transport", payload);
}
