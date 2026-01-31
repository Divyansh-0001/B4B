import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ACCESS_COOKIE, OAUTH_STATE_COOKIE } from "../../../../../lib/auth-cookies";
import { API_BASE_URL } from "../../../../../lib/config";
import { fetchUserProfile, setAuthCookies } from "../../../../../lib/auth-server";
import type { TokenPair } from "../../../../../lib/auth-server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get(OAUTH_STATE_COOKIE)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }

  cookies().delete(OAUTH_STATE_COOKIE);

  const redirectUri = new URL("/api/auth/google/callback", request.url).toString();

  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
    cache: "no-store"
  });

  if (!response.ok) {
    cookies().delete(ACCESS_COOKIE);
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }

  const payload = (await response.json()) as {
    tokens: TokenPair;
  };

  try {
    const user = await fetchUserProfile(payload.tokens.access_token);
    setAuthCookies(payload.tokens, user.role);
  } catch {
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
