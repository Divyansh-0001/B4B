import { cookies } from "next/headers";

export type SessionInfo = {
  accessToken?: string;
  role?: string;
};

export function getSessionInfo(): SessionInfo {
  const store = cookies();
  return {
    accessToken: store.get("bb_access_token")?.value,
    role: store.get("bb_role")?.value
  };
}
