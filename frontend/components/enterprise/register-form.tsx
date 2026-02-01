"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

type SignupResponse = {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
};

export default function RegisterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("loading");
        setError(null);

        const form = new FormData(event.currentTarget);
        const payload = {
          full_name: String(form.get("full_name") || ""),
          email: String(form.get("email") || ""),
          password: String(form.get("password") || ""),
        };

        try {
          await apiFetch<SignupResponse>("/api/v1/auth/signup", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          setStatus("success");
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Registration failed");
        }
      }}
    >
      <label className="space-y-2 text-sm text-white/70">
        Full name
        <input
          required
          name="full_name"
          autoComplete="name"
          className="w-full rounded-2xl border border-white/10 bg-abyss-950/70 px-4 py-3 text-white outline-none transition duration-300 focus:border-lumina-cyan/60 focus:ring-1 focus:ring-lumina-cyan/30"
        />
      </label>
      <label className="space-y-2 text-sm text-white/70">
        Work email
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          className="w-full rounded-2xl border border-white/10 bg-abyss-950/70 px-4 py-3 text-white outline-none transition duration-300 focus:border-lumina-cyan/60 focus:ring-1 focus:ring-lumina-cyan/30"
        />
      </label>
      <label className="space-y-2 text-sm text-white/70">
        Password
        <input
          required
          type="password"
          name="password"
          autoComplete="new-password"
          className="w-full rounded-2xl border border-white/10 bg-abyss-950/70 px-4 py-3 text-white outline-none transition duration-300 focus:border-lumina-cyan/60 focus:ring-1 focus:ring-lumina-cyan/30"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "loading" || status === "success"}>
          {status === "loading" ? "Securing access..." : status === "success" ? "Access created" : "Register"}
        </Button>
        <span className="text-xs text-white/50">Secure client communication channels.</span>
      </div>
      <div className="min-h-[1.5rem] text-sm" role="status" aria-live="polite">
        {status === "success" ? (
          <span className="text-white/70">Registration received. Continue to login.</span>
        ) : (
          <span className="text-lumina-red">{error}</span>
        )}
      </div>
    </form>
  );
}
