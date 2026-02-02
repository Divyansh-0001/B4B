"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  {
    label: "User",
    value: "member",
    description: "Security operators and SOC analysts.",
  },
  {
    label: "Client",
    value: "client",
    description: "Customer stakeholders and partners.",
  },
  {
    label: "Admin",
    value: "admin",
    description: "Platform administrators and security leads.",
  },
];

export function LoginScreen() {
  const { login, loginWithGoogle, status, error, clearError } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedRole, setSelectedRole] =
    React.useState<"member" | "client" | "admin">("member");
  const [autoDetect, setAutoDetect] = React.useState(true);

  const isLoading = status === "loading";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({
        email,
        password,
        role: autoDetect ? undefined : selectedRole,
      });
    } catch {
      // errors surfaced via context
    }
  };

  return (
    <div className="bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <Card className="border-border/60 bg-card/80 shadow-xl">
            <CardHeader className="space-y-3">
              <Badge className="w-fit bg-primary/10 text-primary">
                Secure login
              </Badge>
              <CardTitle className="text-2xl">
                Sign in to your Be4Breach console
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose your role and authenticate to access your secured
                workspace.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Select role
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.value);
                        setAutoDetect(false);
                        clearError();
                      }}
                      className={cn(
                        "rounded-2xl border border-border/60 bg-background/70 p-3 text-left text-xs transition hover:border-primary/40",
                        selectedRole === role.value &&
                          !autoDetect &&
                          "border-primary/70 bg-primary/10 text-foreground"
                      )}
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {role.label}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {role.description}
                      </p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAutoDetect(true);
                    clearError();
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-xs text-muted-foreground transition",
                    autoDetect && "border-primary/70 bg-primary/10 text-primary"
                  )}
                >
                  <span className="h-2 w-2 rounded-full bg-primary/70" />
                  Auto-detect role after login
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
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
                  <Label htmlFor="password">Password</Label>
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
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {error}
                  </div>
                ) : null}

                <Button className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => loginWithGoogle().catch(() => null)}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>

              <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  By signing in you agree to Be4Breach security policies and
                  allow telemetry data to be processed for detection and
                  response.
                </span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Need an account?{" "}
                <Link className="text-primary underline" href="/register">
                  Request access
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
