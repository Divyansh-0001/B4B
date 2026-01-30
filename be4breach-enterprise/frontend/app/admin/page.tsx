import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <div className="glass-panel rounded-3xl p-8">
        <h2 className="text-3xl font-semibold text-white">Admin control</h2>
        <p className="mt-2 text-slate-300">
          Govern users, compliance policies, and incident response workflows.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-lg font-semibold text-white">Role governance</h3>
          <p className="mt-2 text-sm text-slate-300">
            Promote analysts, grant SOC access, and enforce least privilege.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-lg font-semibold text-white">
            Identity monitoring
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Review access audits, OAuth tokens, and cross-tenant policies.
          </p>
        </div>
      </div>
      <Link href="/dashboard" className="text-brand-cyan hover:underline">
        Return to dashboard →
      </Link>
    </section>
  );
}
