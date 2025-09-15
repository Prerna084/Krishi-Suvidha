import { get } from "./api";

/**
 * Fetch market prices and forecasts.
 * @param {Object} params
 * @param {string} [params.location] - e.g., "Punjab" or district/mandi
 * @param {string} [params.cropType] - e.g., "wheat", "rice", "mustard", "gram"
 * @param {string} [params.language] - e.g., "hindi"
 * @returns {Promise<{
 *   currentPrices: Record<string, {price:string, trend:string, change:string}>,
 *   forecast: { nextWeek?: string, nextMonth?: string, seasonal?: string },
 *   localLanguage?: any,
 *   bestSellingLocations?: Array<{location:string, price:string, distance:string}>
 * }>}
 */
export async function fetchMarketPrices({ location, cropType, language } = {}) {
  const params = new URLSearchParams();
  if (location) params.set("location", location);
  if (cropType) params.set("cropType", cropType);
  if (language) params.set("language", language);
  const qs = params.toString();
  return get(qs ? `market-prices?${qs}` : "market-prices");
}
