import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import EnterpriseHeader from "@/components/enterprise/enterprise-header";
import RegisterForm from "@/components/enterprise/register-form";

export default function EnterpriseRegisterPage() {
  return (
    <div className="space-y-8">
      <EnterpriseHeader />
      <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-[32px] p-8 md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge>Enterprise Registration</Badge>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  Secure portal for executive oversight and operational resilience.
                </h2>
                <p className="text-sm text-white/60">
                  Role-based dashboards, real-time incident visibility, and compliance workflows designed for
                  regulated enterprises and critical infrastructure operators.
                </p>
              </div>
              <div className="glow-divider" />
              <div className="space-y-3 text-sm text-white/60">
                <p>Multi-factor authentication, audit trails, and signed reports included by default.</p>
                <p>
                  Built for regulated enterprises, critical infrastructure, and high-value digital assets.
                </p>
              </div>
              <div className="pt-2 text-sm text-white/60">
                Already have access?{" "}
                <Link href="/enterprise/login" className="text-white hover:text-lumina-cyan">
                  Return to secure login
                </Link>
                .
              </div>
            </div>
            <RegisterForm />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
