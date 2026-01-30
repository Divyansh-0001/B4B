import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import LoginPanel from "@/components/LoginPanel";
import MotionSection from "@/components/MotionSection";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-8">
      <MotionSection className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Secure sign-in</h2>
        <p className="text-slate-300">
          Use enterprise credentials or Google SSO for instant access with
          role-based controls.
        </p>
      </MotionSection>
      <LoginPanel />
      <MotionSection>
        <GlassCard className="rounded-3xl p-6 text-sm text-slate-300">
          <h3 className="text-base font-semibold text-white">
            Trusted enterprise access
          </h3>
          <ul className="mt-3 space-y-2">
            <li>• MFA-ready authentication flows with audit logging.</li>
            <li>• RBAC enforcement across admin and analyst workflows.</li>
            <li>• SSO integration designed for regulated environments.</li>
          </ul>
        </GlassCard>
      </MotionSection>
      <p className="text-sm text-slate-400">
        Need admin access?{" "}
        <Link href="/admin" className="text-brand-cyan hover:underline">
          Request elevated permissions
        </Link>
        .
      </p>
    </section>
  );
}
