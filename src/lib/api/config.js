// Where the backend lives. Use "localhost", never 127.0.0.1: the dev server runs on
// http://localhost:5173 and the refresh cookie only rides along between same-site hosts.
const DEFAULT_API_BASE_URL = "http://localhost:8000";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(
  /\/+$/,
  "",
);
