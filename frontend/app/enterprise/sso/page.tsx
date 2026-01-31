"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="section-shell py-16">
        <p className="text-sm text-lumina-red">{error}</p>
      </div>
    );
  }

  return (
    <div className="section-shell py-16 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
