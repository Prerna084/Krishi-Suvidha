import { get, post } from "./api";

export async function fetchBuyers(cropType, location) {
  return get(`marketplace?crop=${encodeURIComponent(cropType)}&location=${encodeURIComponent(location)}`);
}

export async function listCropForSale(cropData) {
  return post("marketplace/list", cropData);
}