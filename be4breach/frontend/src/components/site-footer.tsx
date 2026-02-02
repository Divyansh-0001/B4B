import Link from "next/link";

const footerLinks = {
  Product: [
    { href: "/platform", label: "Platform overview" },
    { href: "/trust-center", label: "Trust center" },
    { href: "/dashboard", label: "Security console" },
  ],
  Resources: [
    { href: "/about", label: "Company" },
    { href: "/auth/login", label: "Developer access" },
    { href: "/auth/register", label: "Partner onboarding" },
  ],
  Company: [
    { href: "/about", label: "Mission & values" },
    { href: "/trust-center", label: "Compliance" },
    { href: "/about", label: "Leadership" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_2fr]">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-foreground">
            Be4Breach Security Operations
          </p>
          <p className="text-sm text-muted-foreground">
            Built for security teams that need visibility, resilience, and
            measurable response improvements without the noise.
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Security Operations HQ</p>
            <p>200 Sentinel Way, Suite 440</p>
            <p>San Francisco, CA 94107</p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="transition-colors hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Be4Breach. All rights reserved.</p>
          <p>
            Security is a shared responsibility. Read our{" "}
            <Link className="underline" href="/trust-center">
              trust commitments
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
