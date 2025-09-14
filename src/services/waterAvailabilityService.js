import { get } from "./api";

export async function getWaterAvailability(location) {
  if (!location) {
    throw new Error("Location is required");
  }
  return get(`water-availability?location=${encodeURIComponent(location)}`);
}
