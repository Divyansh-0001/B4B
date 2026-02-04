"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { TokenStorage } from "@/lib/auth/storage";
import { AuthAPI } from "@/lib/auth/api";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get tokens from URL (Google OAuth callback)
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const errorMessage = searchParams.get("message");

        if (errorMessage) {
          setError("Authentication failed. Please try again.");
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        if (!accessToken || !refreshToken) {
          setError("Invalid authentication response.");
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        // Store tokens
        TokenStorage.setTokens(accessToken, refreshToken);

        // Get user info to determine redirect
        const user = await AuthAPI.getCurrentUser(accessToken);

        // Role-based redirect
        if (user.roles.includes("admin")) {
          router.push("/dashboard/admin");
        } else if (user.roles.includes("client")) {
          router.push("/dashboard/client");
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Callback error:", err);
        setError("Failed to complete authentication.");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
      <div className="text-center">
        {error ? (
          <div>
            <div className="mb-4 text-4xl">⚠️</div>
            <p className="text-xl text-white">{error}</p>
            <p className="mt-2 text-sm text-gray-400">Redirecting to login...</p>
          </div>
        ) : (
          <div>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-xl text-white">Completing sign-in...</p>
            <p className="mt-2 text-sm text-gray-400">Please wait</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
