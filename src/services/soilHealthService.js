import { post } from "./api";

export async function analyzeSoil(soilData) {
  // soilData example: { pH: 6.5, nitrogen: "medium", phosphorus: "low", potassium: "high" }
  return post("soil-analysis", soilData);
}