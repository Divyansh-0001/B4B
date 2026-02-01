"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import EnterpriseHeader from "@/components/enterprise/enterprise-header";
import { ButtonLink } from "@/components/ui/button";

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export default function EnterpriseSsoPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      setError("Missing authorization code.");
      return;
    }
    apiFetch<TokenResponse>(`/api/v1/auth/google/callback?code=${encodeURIComponent(code)}`)
      .then((result) => {
        saveToken(result.access_token);
        router.replace("/enterprise/dashboard");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "SSO failed");
      });
  }, [params, router]);

  if (error) {
    return (
      <div className="space-y-8">
        <EnterpriseHeader />
        <Reveal preset="fade">
          <div className="glass-panel rounded-[28px] p-8">
            <Badge>Google SSO</Badge>
            <h2 className="mt-4 text-2xl font-semibold text-white">Authentication failed.</h2>
            <p className="mt-3 text-sm text-white/60">{error}</p>
            <div className="mt-6">
              <ButtonLink href="/enterprise/login" variant="ghost">
                Return to secure login
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <EnterpriseHeader />
      <Reveal preset="fade">
        <div className="glass-panel rounded-[28px] p-8">
          <Badge>Google SSO</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-white">Verifying secure identity.</h2>
          <p className="mt-3 text-sm text-white/60">
            Secure authentication is in progress. This process keeps access aligned with enterprise
            governance and compliance requirements.
          </p>
          <div className="mt-6 space-y-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
