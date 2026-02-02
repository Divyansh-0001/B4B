"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

type Role = "admin" | "client" | "user";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    if (!next || !next.startsWith("/")) {
      return "/dashboard";
    }
    return next;
  }, [searchParams]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.detail || "Unable to sign in");
      }

      const me = await fetch("/api/v1/protected/me", {
        credentials: "include"
      });

      if (!me.ok) {
        throw new Error("Unable to load profile");
      }

      const profile = (await me.json()) as { role: Role };
      const role = profile?.role ?? "user";
      router.replace(`/dashboard/${role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    const redirect = encodeURIComponent(window.location.origin + nextPath);
    window.location.href = `/api/v1/auth/google/login?redirect=${redirect}`;
  };

  const content = (
    <div className="min-h-screen bg-background text-foreground">
      <div className="layout-container ds-section">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="ds-eyebrow">Be4Breach Access</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Unified login for security teams and stakeholders.
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in with your Be4Breach credentials or connect with Google to access
              tailored dashboards for admins, clients, and users.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="ds-button"
                type="button"
                onClick={handleGoogle}
                disabled={loading}
              >
                Continue with Google
              </button>
              <Link className="ds-link" href="/">
                Back to home
              </Link>
            </div>
          </div>

          <div className="ds-card">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              {error ? (
                <div className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
                  {error}
                </div>
              ) : null}

              <button className="ds-button w-full" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}
