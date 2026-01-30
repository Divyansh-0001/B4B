import { cookies } from "next/headers";

export type SessionInfo = {
  accessToken?: string;
  role?: string;
};

export async function getSessionInfo(): Promise<SessionInfo> {
  const store = await cookies();
  return {
    accessToken: store.get("bb_access_token")?.value,
    role: store.get("bb_role")?.value
  };
}
