import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, IS_PRODUCTION } from "@/lib/backend";

export async function POST(request: NextRequest) {
  let payload: { email?: string; password?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "Invalid request payload." },
      { status: 400 }
    );
  }

  const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.access_token) {
    return NextResponse.json(
      { detail: "Invalid credentials." },
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
