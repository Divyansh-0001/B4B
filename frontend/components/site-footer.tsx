import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Compliance & Trust", href: "/compliance" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12">
      <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">be4breach</p>
          <p className="text-sm text-white/60">
            Trusted cybersecurity partner delivering elite defense, rapid response, and compliance-ready
            assurance for global enterprises.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/60">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Navigate</p>
          <div className="flex flex-col gap-2">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-white/60">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Enterprise</p>
          <p>Secure operations. 24/7 intelligence. CERT-In empanelment.</p>
          <p className="text-white/40">© 2026 be4breach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
