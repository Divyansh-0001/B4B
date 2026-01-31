import { NextResponse } from "next/server";

import { API_BASE_URL } from "../../../../lib/config";
import { fetchUserProfile, setAuthCookies } from "../../../../lib/auth-server";
import type { TokenPair } from "../../../../lib/auth-server";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginPayload;
  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form,
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Invalid credentials or access denied." },
      { status: 401 }
    );
  }

  const tokens = (await response.json()) as TokenPair;
  let user;
  try {
    user = await fetchUserProfile(tokens.access_token);
  } catch {
    return NextResponse.json(
      { error: "Authentication failed. Try again." },
      { status: 401 }
    );
  }

  setAuthCookies(tokens, user.role);

  return NextResponse.json({ user });
}
