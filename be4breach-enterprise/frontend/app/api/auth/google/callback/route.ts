import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, IS_PRODUCTION } from "@/lib/backend";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const exchangeCode = searchParams.get("exchange_code");
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  if (!exchangeCode) {
    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", "sso_failed");
    return NextResponse.redirect(errorUrl);
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/auth/google/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exchange_code: exchangeCode })
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.access_token) {
    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", "sso_failed");
    return NextResponse.redirect(errorUrl);
  }

  const safeRedirect = redirect.startsWith("/") ? redirect : "/dashboard";
  const redirectUrl = new URL(safeRedirect, request.url);
  const nextResponse = NextResponse.redirect(redirectUrl);
  const cookieOptions = {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    path: "/"
  };

  nextResponse.cookies.set("bb_access_token", data.access_token, {
    ...cookieOptions,
    maxAge: data.expires_in ?? 3600
  });
  if (data.refresh_token) {
    nextResponse.cookies.set("bb_refresh_token", data.refresh_token, {
      ...cookieOptions,
      maxAge: data.refresh_expires_in ?? 1209600
    });
  }
  if (data.role) {
    nextResponse.cookies.set("bb_role", data.role, {
      ...cookieOptions,
      maxAge: data.expires_in ?? 3600
    });
  }

  return nextResponse;
}
