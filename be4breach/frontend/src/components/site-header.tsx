import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/platform", label: "Platform" },
  { href: "/trust-center", label: "Trust Center" },
  { href: "/about", label: "Company" },
  { href: "/dashboard", label: "Console" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur">
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
          <Button
            asChild
            variant="ghost"
            className="hidden border border-transparent hover:border-border/70 sm:inline-flex"
          >
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild className="shadow-sm">
            <Link href="/auth/register">Request access</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
