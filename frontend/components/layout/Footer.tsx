"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo width={140} height={42} />
            </div>
            <p className="mb-2 text-sm text-gray-400">
              Young, ambitious leader in penetration testing, cloud security, and next-gen cybersecurity services.
            </p>
            <p className="mb-4 text-sm text-gray-400">
              Headquartered in Pune, India · Serving clients globally
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white">
                  Penetration Testing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white">
                  Cloud Security
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white">
                  Threat Intelligence
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white">
                  Security Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-400 hover:text-white">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} Be4Breach. All rights reserved. · Pune, India
          </p>
        </div>
      </div>
    </footer>
  );
}
