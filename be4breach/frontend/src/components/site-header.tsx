"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/platform", label: "Services" },
  { href: "/trust-center", label: "Compliance" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Console" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-4 z-50 w-full">
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-6xl items-center gap-6 rounded-full border px-6 shadow-lg backdrop-blur",
          isHome
            ? "dark border-white/10 bg-background/40 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.9)]"
            : "border-border/60 bg-background/70"
        )}
      >
        <Link
          className="flex items-center gap-2 font-semibold text-foreground"
          href="/"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-base tracking-tight">Be4Breach</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={cn(
                  "group relative text-muted-foreground transition-colors duration-300 hover:text-foreground",
                  isActive && "text-foreground"
                )}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-0 bg-primary/70 transition-all duration-300 group-hover:w-full",
                    isActive && "w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AuthActions />
        </div>
      </div>
    </header>
  );
}
