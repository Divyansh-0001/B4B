const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type GoogleAuthUrlResponse = {
  authorization_url: string;
  state: string;
};

export async function submitContact(payload: ContactPayload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Unable to submit request.");
  }

  return response.json();
}

export async function loginWithEmail(payload: LoginPayload): Promise<TokenResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Invalid credentials.");
  }

  return response.json();
}

export async function getGoogleAuthUrl(): Promise<GoogleAuthUrlResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/google/url`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Google sign-in is not available.");
  }

  return response.json();
}
