"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const ssoError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.detail ?? "Unable to sign in with those credentials.");
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/auth/google?redirect=${encodeURIComponent(redirectTo)}`,
        { method: "GET" }
      );
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.auth_url) {
        setError("Google SSO is unavailable. Please try again.");
        return;
      }
      window.location.href = data.auth_url;
    } catch {
      setError("Google SSO is unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-3xl p-8"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Work email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30"
          />
        </div>
        {error || ssoError ? (
          <div className="rounded-xl border border-brand-red/40 bg-brand-red/10 px-4 py-3 text-xs text-red-200">
            {error ?? "Single sign-on failed. Please try again."}
          </div>
        ) : null}
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 18px 40px -28px rgba(59, 130, 246, 0.8)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Continue securely"}
        </motion.button>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <motion.button
          whileHover={{ y: -2, borderColor: "rgba(255, 255, 255, 0.6)" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Connecting..." : "Sign in with Google"}
        </motion.button>
      </form>
    </motion.div>
  );
}
