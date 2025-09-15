import { get } from "./api";

/**
 * Fetch upcoming demonstrations and videos.
 * @param {string} [location] Optional location filter
 * @returns {Promise<{
 *   upcomingEvents: Array<{title:string,date:string,location:string,description:string,registration?:string}>,
 *   videos: Array<{title:string,duration?:string,language?:string,url?:string}>,
 *   technologies?: Array<{name:string,benefits?:string,cost?:string,subsidy?:string}>
 * }>}
 */
export async function getDemonstrations(location) {
  const qs = location ? `?location=${encodeURIComponent(location)}` : "";
  return get(`demonstrations${qs}`);
}
