
import axios from "axios";

// Prefer 127.0.0.1 for local dev to avoid occasional localhost DNS issues on Windows
const DEFAULT_BASE = "http://localhost:5000";
const FALLBACK_BASE = "http://127.0.0.1:5000";

// If running in a browser and the page is served from localhost, prefer 127.0.0.1 for API
export const API_BASE_URL =
  typeof window !== "undefined" && window.location && window.location.hostname === "localhost"
    ? FALLBACK_BASE
    : DEFAULT_BASE;

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
