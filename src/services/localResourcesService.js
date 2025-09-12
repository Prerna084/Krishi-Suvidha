import { get } from "./api";

export async function fetchKrishiKendras(location) {
  return get(`krishi-kendras?location=${encodeURIComponent(location)}`);
}