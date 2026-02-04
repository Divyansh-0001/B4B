"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utils";

interface NavigationLink {
  href: string;
  label: string;
  requiresAuth?: boolean;
}

const links: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard", label: "Dashboard", requiresAuth: true },
  { href: "/login", label: "Client Portal" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const filteredLinks = links.filter((link) => {
    if (link.requiresAuth) return isAuthenticated;
    if (link.href === "/login") return !isAuthenticated;
    return true;
  });

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-primary p-2"
            >
              <Shield className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-white">Be4Breach</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            {isAuthenticated && (
              <Button onClick={logout} variant="outline" size="sm">
                Sign Out
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-black md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {filteredLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
