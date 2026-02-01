const TOKEN_KEY = "be4breach.token";

export type TokenPayload = {
  sub?: string;
  role?: string;
  exp?: number;
};

export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const json = JSON.parse(atob(padded));
    return json as TokenPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(payload: TokenPayload | null): boolean {
  if (!payload?.exp) return false;
  return Date.now() / 1000 >= payload.exp;
}

export function getRoleFromToken(token: string | null): string | null {
  if (!token) return null;
  const payload = decodeToken(token);
  if (isTokenExpired(payload)) return null;
  return payload?.role ?? null;
}
