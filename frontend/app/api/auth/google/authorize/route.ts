import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { OAUTH_STATE_COOKIE } from "../../../../../lib/auth-cookies";
import { IS_PROD } from "../../../../../lib/config";

export async function GET(request: Request) {
  const clientId =
    process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(new URL("/login?error=oauth_config", request.url));
  }

  const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
  const state = crypto.randomUUID();

  cookies().set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 300
  });

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);

  return NextResponse.redirect(authUrl.toString());
}
