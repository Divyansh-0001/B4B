"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
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
    description: "Security operations and SOC teams.",
  },
  {
    label: "Client",
    value: "client",
    description: "Stakeholder access for customers.",
  },
];

export function RegisterScreen() {
  const { register, status, error, clearError } = useAuth();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<"member" | "client">("member");

  const isLoading = status === "loading";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register({
        full_name: fullName,
        email,
        password,
        requested_role: role,
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
                Request access
              </Badge>
              <CardTitle className="text-2xl">
                Start your Be4Breach evaluation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Tell us about your security program and we will provision a
                secure workspace.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Account type
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roles.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setRole(item.value);
                        clearError();
                      }}
                      className={cn(
                        "rounded-2xl border border-border/60 bg-background/70 p-3 text-left text-xs transition hover:border-primary/40",
                        role === item.value &&
                          "border-primary/70 bg-primary/10 text-foreground"
                      )}
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    placeholder="Alex Morgan"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);
                      clearError();
                    }}
                    required
                  />
                </div>
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
                    placeholder="Minimum 8 characters"
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
                  {isLoading ? "Submitting..." : "Submit request"}
                </Button>
              </form>

              <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  We will review your request and confirm access within one
                  business day.
                </span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Already have access?{" "}
                <Link className="text-primary underline" href="/login">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
