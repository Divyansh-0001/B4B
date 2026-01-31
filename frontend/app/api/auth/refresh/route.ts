import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { REFRESH_COOKIE } from "../../../../lib/auth-cookies";
import { API_BASE_URL } from "../../../../lib/config";
import { fetchUserProfile, setAuthCookies } from "../../../../lib/auth-server";
import type { TokenPair } from "../../../../lib/auth-server";

export async function POST() {
  const refreshToken = cookies().get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: "Missing refresh token." }, { status: 401 });
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to refresh session." }, { status: 401 });
  }

  const tokens = (await response.json()) as TokenPair;
  try {
    const user = await fetchUserProfile(tokens.access_token);
    setAuthCookies(tokens, user.role);
  } catch {
    return NextResponse.json(
      { error: "Unable to refresh session." },
      { status: 401 }
    );
  }

  return NextResponse.json({ status: "ok" });
}
