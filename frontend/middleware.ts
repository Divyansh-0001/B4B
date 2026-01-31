import { NextResponse, type NextRequest } from "next/server";

import { ACCESS_COOKIE, ROLE_COOKIE } from "./lib/auth-cookies";

const allowedRoles = new Set(["OPERATIVE", "PARTNER", "COMMAND"]);

function decodeJwtExp(token: string): number | null {
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }
  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  try {
    const payload = JSON.parse(atob(padded)) as { exp?: number };
    return payload.exp ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const role = request.cookies.get(ROLE_COOKIE)?.value;

  if (!accessToken || !role || !allowedRoles.has(role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const exp = decodeJwtExp(accessToken);
  if (!exp || exp * 1000 <= Date.now()) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
