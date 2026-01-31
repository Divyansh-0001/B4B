import { cookies } from "next/headers";

import { ACCESS_COOKIE, OAUTH_STATE_COOKIE, REFRESH_COOKIE, ROLE_COOKIE } from "./auth-cookies";
import { API_BASE_URL, IS_PROD } from "./config";
import { decodeJwtPayload } from "./jwt";

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string | null;
  role: string;
  is_active: boolean;
};

export async function fetchUserProfile(accessToken: string): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to fetch user profile.");
  }

  return (await response.json()) as UserProfile;
}

export function setAuthCookies(tokens: TokenPair, role: string): void {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const refreshPayload = decodeJwtPayload(tokens.refresh_token);
  const refreshExp = refreshPayload?.exp ?? nowSeconds + tokens.expires_in * 24;
  const refreshMaxAge = Math.max(refreshExp - nowSeconds, 0);

  cookies().set(ACCESS_COOKIE, tokens.access_token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in
  });
  cookies().set(REFRESH_COOKIE, tokens.refresh_token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge
  });
  cookies().set(ROLE_COOKIE, role, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge
  });
}

export function clearAuthCookies(): void {
  cookies().set(ACCESS_COOKIE, "", {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  cookies().set(REFRESH_COOKIE, "", {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  cookies().set(ROLE_COOKIE, "", {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  cookies().set(OAUTH_STATE_COOKIE, "", {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}
