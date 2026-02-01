import ActivityStream from "@/components/enterprise/activity-stream";
import DashboardPanels from "@/components/enterprise/dashboard-panels";
import EnterpriseHeader from "@/components/enterprise/enterprise-header";
import RoleGate from "@/components/enterprise/role-gate";
import { Reveal } from "@/components/motion/reveal";

export default function EnterpriseDashboardPage() {
  return (
    <RoleGate allowed={["user", "client", "admin"]}>
      <div className="space-y-8">
        <EnterpriseHeader />
        <Reveal>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Security posture</p>
              <h2 className="text-3xl font-semibold text-white">Operational command overview</h2>
            </div>
            <DashboardPanels />
          </div>
        </Reveal>
        <Reveal>
          <ActivityStream />
        </Reveal>
      </div>
    </RoleGate>
  );
}
