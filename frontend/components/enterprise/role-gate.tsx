"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { getRoleFromToken, getToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoleGate({
  allowed,
  children,
}: {
  allowed: string[];
  children: ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    const role = getRoleFromToken(token);

    if (!token || !role) {
      router.replace("/enterprise/login");
      return;
    }
    if (!allowed.includes(role)) {
      router.replace("/enterprise/login");
      return;
    }
    setChecking(false);
  }, [allowed, router]);

  if (checking) {
    return (
      <div className="section-shell py-16">
        <Skeleton className="h-10 w-1/2" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
