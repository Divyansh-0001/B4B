"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }

    if (!isLoading && isAuthenticated && requiredRole && user) {
      const hasRequiredRole = requiredRole.some((role) =>
        user.roles.includes(role)
      );

      if (!hasRequiredRole) {
        router.push("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user) {
    const hasRequiredRole = requiredRole.some((role) =>
      user.roles.includes(role)
    );

    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
}
