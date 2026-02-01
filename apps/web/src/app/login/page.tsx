"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getGoogleAuthUrl, loginWithEmail } from "@/lib/api";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "client", label: "Client" },
  { value: "user", label: "User" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const token = await loginWithEmail({ email, password });
      localStorage.setItem("be4breach_token", token.access_token);
      localStorage.setItem("be4breach_role", role);
      router.push(`/dashboard/${role}`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      sessionStorage.setItem("be4breach_role", role);
      const { authorization_url } = await getGoogleAuthUrl();
      window.location.href = authorization_url;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to start Google sign-in.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container-wide">
        <div className="mx-auto max-w-md">
          <div className="card-lg space-y-6">
            <div>
              <p className="text-caption">Be4Breach</p>
              <h1 className="mt-3 text-ink">Sign in</h1>
              <p className="mt-2 text-steel">
                Access your workspace with a single, unified login.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-ink">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-base text-ink focus:border-brand focus:outline-none"
                >
                  {roles.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-base text-ink focus:border-brand focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-ink">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-base text-ink focus:border-brand focus:outline-none"
                />
              </div>

              {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full border border-brand/40 bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full border border-frost bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Sign in with Google
            </button>

            <div className="text-sm text-steel">
              Need help?{" "}
              <Link href="/contact" className="text-brand">
                Contact support
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
