
import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Normalize relative paths to backend API base
function normalizePath(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/api/")) return path;
  if (path.startsWith("/")) return `/api${path}`;
  return `/api/${path}`;
}

export async function get(path, config = {}) {
  const url = normalizePath(path);
  const res = await api.get(url, config);
  return res.data;
}

export async function post(path, data = {}, config = {}) {
  const url = normalizePath(path);
  const res = await api.post(url, data, config);
  return res.data;
}

export async function put(path, data = {}, config = {}) {
  const url = normalizePath(path);
  const res = await api.put(url, data, config);
  return res.data;
}

export async function del(path, config = {}) {
  const url = normalizePath(path);
  const res = await api.delete(url, config);
  return res.data;
}

export default api;
