import { get } from "./api";

// Fetch weather from our backend
export async function getWeather(location) {
  return get(`weather?location=${encodeURIComponent(location)}`);
}
