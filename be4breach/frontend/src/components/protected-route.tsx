"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProtectedRouteProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export function ProtectedRoute({
  children,
  title = "Secure area",
  description = "Sign in with the correct role to continue.",
}: ProtectedRouteProps) {
  const { user, status } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  if (status === "loading") {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-6 py-16">
        <div className="h-32 w-full max-w-md animate-pulse rounded-2xl border border-border/60 bg-card/70" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-6 py-16">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
        >
          <Card className="w-full max-w-md border-border/60 bg-card/80 shadow-xl">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">Request access</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
