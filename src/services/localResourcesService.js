import { get } from "./api";

export async function fetchKrishiKendras(location) {
  // Backend endpoint is /api/krishi-kendra (singular)
  return get(`krishi-kendra?location=${encodeURIComponent(location)}`);
}
