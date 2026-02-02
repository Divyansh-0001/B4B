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
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur",
        isHome
          ? "dark border-white/10 bg-background/40"
          : "border-border/60 bg-background/70"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="group relative text-muted-foreground transition-colors hover:text-foreground"
              href={item.href}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-primary/70 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AuthActions />
        </div>
      </div>
    </header>
  );
}
