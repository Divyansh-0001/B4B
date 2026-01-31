import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import EnterpriseHeader from "@/components/enterprise/enterprise-header";
import LoginForm from "@/components/enterprise/login-form";

export default function EnterpriseLoginPage() {
  return (
    <div className="space-y-8">
      <EnterpriseHeader />
      <Reveal>
        <div className="glass-panel rounded-[28px] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              <Badge>Secure Login</Badge>
              <h2 className="text-3xl font-semibold text-white">Authenticate to continue.</h2>
              <p className="text-sm text-white/60">
                Role-based access protects sensitive reports, incident data, and compliance evidence. SSO is
                optional and fail-safe by design.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
