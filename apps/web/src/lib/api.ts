const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
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
