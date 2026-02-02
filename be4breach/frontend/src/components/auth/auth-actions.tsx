"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

export function AuthActions() {
  const { user, status, logout } = useAuth();

  if (status === "loading") {
    return <div className="h-9 w-32 rounded-full bg-muted/40" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-muted-foreground md:inline">
          {user.email}
        </span>
        <Button variant="ghost" onClick={logout}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        asChild
        variant="ghost"
        className="hidden border border-transparent hover:border-border/70 sm:inline-flex"
      >
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild className="shadow-sm">
        <Link href="/register">Request access</Link>
      </Button>
    </>
  );
}
