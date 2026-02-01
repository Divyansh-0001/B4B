import { Card } from "@/components/ui/card";

const panels = [
  {
    title: "Active Monitoring",
    metric: "Operational",
    detail: "SOC coverage with continuous alert triage and escalation discipline.",
  },
  {
    title: "Incident Readiness",
    metric: "Prepared",
    detail: "Response playbooks validated and recovery timelines rehearsed.",
  },
  {
    title: "Compliance Posture",
    metric: "Aligned",
    detail: "CERT-In empanelment documentation current and audit-ready.",
  },
  {
    title: "Risk Oversight",
    metric: "Executive",
    detail: "Board-level reporting cadence with enterprise risk scoring.",
  },
];

export default function DashboardPanels() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {panels.map((panel) => (
        <Card key={panel.title} className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{panel.title}</p>
          <p className="text-2xl font-semibold text-white">{panel.metric}</p>
          <p className="text-sm text-white/60">{panel.detail}</p>
        </Card>
      ))}
    </div>
  );
}
