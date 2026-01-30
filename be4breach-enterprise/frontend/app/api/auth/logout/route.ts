import { NextResponse } from "next/server";
import { IS_PRODUCTION } from "@/lib/backend";

export async function POST() {
  const response = NextResponse.json({ status: "ok" });
  const cookieOptions = {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0
  };

  response.cookies.set("bb_access_token", "", cookieOptions);
  response.cookies.set("bb_refresh_token", "", cookieOptions);
  response.cookies.set("bb_role", "", cookieOptions);
  return response;
}
