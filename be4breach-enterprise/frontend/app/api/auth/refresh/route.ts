import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, IS_PRODUCTION } from "@/lib/backend";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("bb_refresh_token")?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { detail: "Refresh token missing." },
      { status: 401 }
    );
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.access_token) {
    return NextResponse.json(
      { detail: "Unable to refresh session." },
      { status: response.status || 401 }
    );
  }

  const nextResponse = NextResponse.json({ status: "ok" });
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
