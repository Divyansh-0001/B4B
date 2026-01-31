"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import Navigation from "../../components/Navigation";

type RoleOption = {
  id: "OPERATIVE" | "PARTNER" | "COMMAND";
  title: string;
  description: string;
  clearance: string;
};

const roleOptions: RoleOption[] = [
  {
    id: "OPERATIVE",
    title: "Operative",
    description: "Front-line defenders executing containment and investigations.",
    clearance: "Response-grade operational access."
  },
  {
    id: "PARTNER",
    title: "Partner Organization",
    description: "Trusted enterprises sharing telemetry and response alignment.",
    clearance: "Partner lanes with shared intelligence workflows."
  },
  {
    id: "COMMAND",
    title: "Command Authority",
    description: "Strategic oversight with elevated mission directives.",
    clearance: "Executive controls and escalation authority."
  }
];

const terminalStatus = [
  "JWT session enforcement online",
  "Token expiry policy active",
  "Role enforcement locked",
  "Protected routes secured"
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleOption["id"]>(
    "OPERATIVE"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedRole, setVerifiedRole] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const roleDetail = useMemo(
    () => roleOptions.find((role) => role.id === selectedRole),
    [selectedRole]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setError(payload.error ?? "Authentication failed. Try again.");
      setIsSubmitting(false);
      return;
    }

    const payload = (await response.json()) as {
      user: { role: string };
    };
    setVerifiedRole(payload.user.role);
    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google/authorize";
  };

  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-24 pt-28">
        <BackgroundScene />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
                Secure Access Terminal
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                <GlitchText
                  text="Secure Access Terminal"
                  className="drop-shadow-[0_0_12px_rgba(69,243,255,0.5)]"
                />
              </h1>
              <p className="mt-5 text-lg text-slate-200">
                Authenticate with command-grade credentials or trusted partner
                SSO to enter the Be4Breach command lattice.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-abyss/80 shadow-2xl backdrop-blur">
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)"
                }}
              />
              <div className="absolute inset-x-0 -top-1/3 h-1/3 bg-gradient-to-b from-neon/20 to-transparent animate-pulse" />
              <div className="relative space-y-5 p-6 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Access Verification
                  </p>
                  <p className="mt-2 text-lg text-white">
                    {isSubmitting ? "Verifying credentials" : "Awaiting credentials"}
                    {isSubmitting ? (
                      <span className="ml-2 inline-flex items-center gap-2">
                        {["0s", "0.2s", "0.4s"].map((delay) => (
                          <span
                            key={delay}
                            className="h-1.5 w-1.5 rounded-full bg-neon/70 animate-pulse"
                            style={{ animationDelay: delay }}
                          />
                        ))}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Clearance profile: {roleDetail?.title}
                  </p>
                </div>
                <div className="grid gap-3">
                  {terminalStatus.map((line) => (
                    <div
                      key={line}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-abyss/80 px-4 py-3"
                    >
                      <span>{line}</span>
                      <span className="text-neon">Active</span>
                    </div>
                  ))}
                </div>
                {verifiedRole ? (
                  <p className="text-xs uppercase tracking-[0.3em] text-neon/70">
                    Clearance verified: {verifiedRole}
                  </p>
                ) : null}
                {oauthError ? (
                  <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-amber-200">
                    Google SSO unavailable. Use command credentials.
                  </p>
                ) : null}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-abyss/70 p-6 text-sm text-slate-300 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Role-aware Access
              </p>
              <p className="mt-3">
                Select the clearance profile that matches your mission. Your role
                is validated against Be4Breach access policy during sign-in.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {roleOptions.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-xs uppercase tracking-[0.3em] transition ${
                      selectedRole === role.id
                        ? "border-neon/70 bg-neon/10 text-neon"
                        : "border-white/10 text-slate-300 hover:border-neon/40"
                    }`}
                  >
                    {role.title}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-abyss/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Clearance Brief
                </p>
                <p className="mt-2 text-white">{roleDetail?.description}</p>
                <p className="mt-2 text-slate-300">{roleDetail?.clearance}</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-abyss/80 p-8 shadow-2xl backdrop-blur">
            <div className="absolute inset-0 pointer-events-none opacity-15">
              <div className="h-full w-full bg-[linear-gradient(120deg,rgba(69,243,255,0.12),transparent_55%)]" />
            </div>
            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Operative Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="operative@be4breach.io"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-abyss/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-neon/70 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Access Code
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="********"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-abyss/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-neon/70 focus:outline-none"
                  required
                />
              </div>
              {error ? (
                <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-neon px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abyss shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Authenticating" : "Authenticate"}
              </button>
              <div className="grid gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full rounded-full border border-white/10 px-4 py-3 text-white/80 transition hover:border-neon/60 hover:text-neon"
                >
                  Continue with Google SSO
                </button>
                <div className="rounded-2xl border border-white/10 bg-abyss/80 px-4 py-3 text-[0.7rem] uppercase tracking-[0.3em]">
                  Partner organizations can use Google SSO if their domain is
                  allowlisted.
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
