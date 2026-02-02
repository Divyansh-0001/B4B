import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/platform", label: "Platform" },
  { href: "/trust-center", label: "Trust Center" },
  { href: "/about", label: "About" },
  { href: "/auth/login", label: "Sign in" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          className="flex items-center gap-2 font-semibold text-foreground"
          href="/"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-base tracking-tight">Be4Breach</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="transition-colors hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/auth/register">Request access</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Console</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
