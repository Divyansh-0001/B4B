import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function EnterpriseHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">be4breach Enterprise</p>
        <h1 className="text-2xl font-semibold text-white">Secure Operations Portal</h1>
      </div>
      <div className="flex items-center gap-3">
        <ButtonLink href="/enterprise/dashboard" variant="ghost">
          Dashboard
        </ButtonLink>
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          Return to public site
        </Link>
      </div>
    </div>
  );
}
