"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Chrome, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginScreen() {
  const router = useRouter();
  const { user, login, loginWithGoogle, status, error, clearError } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const shouldReduceMotion = useReducedMotion();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && user;

  const redirectTarget = React.useMemo(() => {
    if (!user) {
      return "/dashboard";
    }
    if (user.roles.includes("admin")) {
      return "/dashboard?view=admin";
    }
    if (user.roles.includes("client")) {
      return "/dashboard?view=client";
    }
    return "/dashboard?view=user";
  }, [user]);

  React.useEffect(() => {
    if (isAuthenticated) {
      const id = requestAnimationFrame(() => router.replace(redirectTarget));
      return () => cancelAnimationFrame(id);
    }
  }, [isAuthenticated, redirectTarget, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({
        email,
        password,
      });
    } catch {
      // errors surfaced via context
    }
  };

  return (
    <div className="dark min-h-screen bg-hero-gradient text-white">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-grid-slate" />
      </div>
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }
          }
          className="w-full max-w-lg"
        >
          <Card className="border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur neon-border">
            <CardHeader className="space-y-3">
              <Badge className="w-fit bg-white/10 text-white/80">
                Secure access
              </Badge>
              <CardTitle className="text-2xl">
                Unified console authentication
              </CardTitle>
              <p className="text-sm text-white/70">
                Roles are detected automatically after authentication for a
                secure, seamless transition.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {isAuthenticated ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                  Authentication verified. Redirecting to your dashboard...
                </div>
              ) : (
                <>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/80">
                        Work email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          clearError();
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white/80">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          clearError();
                        }}
                        required
                      />
                    </div>

                    {error ? (
                      <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        {error}
                      </div>
                    ) : null}

                    <Button
                      className="w-full bg-cyan-400/90 text-slate-950 hover:bg-cyan-300"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                  </form>

                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    size="lg"
                    onClick={() => loginWithGoogle().catch(() => null)}
                    disabled={isLoading}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>

                  <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>
                      This console is protected by enterprise-grade access
                      controls and audit logging.
                    </span>
                  </div>
                  <p className="text-center text-sm text-white/60">
                    Need an account?{" "}
                    <Link className="text-cyan-200 underline" href="/register">
                      Request access
                    </Link>
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
