import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ACCESS_COOKIE } from "../../../../lib/auth-cookies";
import { fetchUserProfile } from "../../../../lib/auth-server";

export async function GET() {
  const accessToken = cookies().get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const user = await fetchUserProfile(accessToken);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
}
