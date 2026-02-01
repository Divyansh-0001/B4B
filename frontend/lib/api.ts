const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";
export const API_BASE = RAW_API_BASE.replace(/\/$/, "");

function buildApiUrl(path: string) {
  if (!API_BASE) return path;
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const fallback = await response.text();
    throw new Error(fallback || "Request failed");
  }

  return response.json() as Promise<T>;
}
