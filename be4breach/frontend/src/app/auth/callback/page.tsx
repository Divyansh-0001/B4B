"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearError, applyTokens } = useAuth();
  const [status, setStatus] = React.useState<"loading" | "error">("loading");
  const [message, setMessage] = React.useState("Completing sign-in...");
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setStatus("error");
      setMessage("Missing authorization code.");
      return;
    }

    const completeAuth = async () => {
      try {
        clearError();
        const tokens = await apiRequest<TokenResponse>(
          `/api/v1/auth/google/callback?code=${encodeURIComponent(code)}`
        );
        await applyTokens(tokens.access_token, tokens.refresh_token);
        router.replace("/dashboard");
      } catch (err) {
        setStatus("error");
        setMessage("Unable to complete Google sign-in.");
      }
    };

    completeAuth();
  }, [clearError, router, searchParams]);

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
            <CardTitle className="text-2xl">SSO authentication</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {status === "loading" ? (
              <p>{message}</p>
            ) : (
              <p className="text-destructive">{message}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-6 py-16">
          <Card className="w-full max-w-md border-border/60 bg-card/80 shadow-xl">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-2xl">SSO authentication</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Preparing secure session...
            </CardContent>
          </Card>
        </div>
      }
    >
      <AuthCallbackContent />
    </React.Suspense>
  );
}
