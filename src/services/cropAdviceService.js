import { post } from "./api";

export async function getCropAdvice({ location, soilType, season, currentCrop }) {
  if (!location) throw new Error("Location is required");
  return post("crop-advice", { location, soilType, season, currentCrop });
}
