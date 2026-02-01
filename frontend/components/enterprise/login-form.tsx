"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { saveToken } from "@/lib/auth";

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type GoogleLoginResponse = {
  enabled: boolean;
  url: string | null;
};

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setStatus("loading");
          setError(null);

          const form = new FormData(event.currentTarget);
          const payload = {
            email: String(form.get("email") || ""),
            password: String(form.get("password") || ""),
          };

          try {
            const result = await apiFetch<TokenResponse>("/api/v1/auth/login", {
              method: "POST",
              body: JSON.stringify(payload),
            });
            saveToken(result.access_token);
            router.push("/enterprise/dashboard");
          } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Authentication failed");
          }
        }}
      >
        <label className="space-y-2 text-sm text-white/70">
          Work email
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-lumina-cyan/70"
          />
        </label>
        <label className="space-y-2 text-sm text-white/70">
          Password
          <input
            required
            type="password"
            name="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-lumina-cyan/70"
          />
        </label>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Verifying..." : "Access portal"}
          </Button>
          {error && <span className="text-sm text-lumina-red">{error}</span>}
        </div>
      </form>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Button
        variant="ghost"
        type="button"
        onClick={async () => {
          try {
            const result = await apiFetch<GoogleLoginResponse>("/api/v1/auth/google/login");
            if (result.enabled && result.url) {
              window.location.href = result.url;
            } else {
              setError("Google SSO is unavailable for this environment.");
              setStatus("error");
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : "SSO unavailable");
            setStatus("error");
          }
        }}
      >
        Continue with Google SSO
      </Button>
    </div>
  );
}
