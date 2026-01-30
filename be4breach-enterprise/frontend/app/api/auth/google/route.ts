import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/backend";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const callbackUrl = new URL("/api/auth/google/callback", request.url);
  callbackUrl.searchParams.set("redirect", redirect);

  const response = await fetch(
    `${BACKEND_URL}/api/v1/auth/google?redirect=${encodeURIComponent(
      callbackUrl.toString()
    )}`,
    { method: "GET" }
  );

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.auth_url) {
    return NextResponse.json(
      { detail: "Google sign-in unavailable." },
      { status: response.status || 400 }
    );
  }

  return NextResponse.json({ auth_url: data.auth_url });
}
