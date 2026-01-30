export const BACKEND_URL =
  process.env.BACKEND_URL ?? "http://localhost:8000";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
