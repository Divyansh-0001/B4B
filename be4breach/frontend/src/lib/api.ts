export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type ApiError = {
  message: string;
  status: number;
};

type RequestOptions = RequestInit & {
  accessToken?: string | null;
};

export async function apiRequest<T>(
  path: string,
  { accessToken, headers, ...options }: RequestOptions = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    let message = "Request failed.";
    try {
      const data = (await response.json()) as { detail?: string };
      if (data?.detail) {
        message = data.detail;
      }
    } catch {
      // ignore parsing errors
    }
    const error: ApiError = { message, status: response.status };
    throw error;
  }

  return (await response.json()) as T;
}

export function getStoredTokens() {
  if (typeof window === "undefined") {
    return null;
  }
  const accessToken = window.localStorage.getItem("access_token");
  const refreshToken = window.localStorage.getItem("refresh_token");
  if (!accessToken || !refreshToken) {
    return null;
  }
  return { accessToken, refreshToken };
}

export function storeTokens(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("access_token", accessToken);
  window.localStorage.setItem("refresh_token", refreshToken);
}

export function clearTokens() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
}
