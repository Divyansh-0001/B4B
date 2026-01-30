import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import MotionSection from "@/components/MotionSection";

export default function AdminPage() {
  return (
    <section className="space-y-8">
      <MotionSection className="glass-panel rounded-3xl p-8">
        <h2 className="text-3xl font-semibold text-white">
          Be4Breach admin control
        </h2>
        <p className="mt-2 text-slate-300">
          Govern users, compliance policies, and incident response workflows
          with enterprise-grade oversight.
        </p>
      </MotionSection>

      <MotionSection className="grid gap-6 md:grid-cols-2">
        <GlassCard className="rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Role governance</h3>
          <p className="mt-2 text-sm text-slate-300">
            Promote analysts, grant SOC access, and enforce least-privilege
            controls with audit-ready approvals.
          </p>
        </GlassCard>
        <GlassCard className="rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">
            Identity monitoring
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Review access audits, OAuth tokens, and cross-tenant identity
            policies with clear evidence trails.
          </p>
        </GlassCard>
      </MotionSection>

      <MotionSection className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Compliance & risk management",
            description:
              "Centralize control ownership, map frameworks, and track remediation progress across ISO, SOC 2, PCI, HIPAA, and GDPR."
          },
          {
            title: "Incident governance",
            description:
              "Approve playbooks, define escalation chains, and monitor post-incident action plans with executive visibility."
          },
          {
            title: "Third-party oversight",
            description:
              "Manage vendor risk assessments, data access reviews, and contractual security requirements."
          }
        ].map((item) => (
          <GlassCard key={item.title} className="rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </GlassCard>
        ))}
      </MotionSection>

      <Link href="/dashboard" className="text-brand-cyan hover:underline">
        Return to dashboard →
      </Link>
    </section>
  );
}
