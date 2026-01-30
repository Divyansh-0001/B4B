import StatCard from "@/components/StatCard";

const metrics = [
  { label: "Active Campaigns", value: "12" },
  { label: "Critical Alerts", value: "3" },
  { label: "Training Completion", value: "92%" },
  { label: "Mean Time to Respond", value: "14 min" }
];

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-white">Security dashboard</h2>
        <p className="mt-2 text-slate-300">
          Monitor real-time risk signals and recommended actions.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
      <div className="glass-panel rounded-3xl p-8">
        <h3 className="text-lg font-semibold text-white">Next actions</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>Review suspicious login anomalies detected in the EU region.</li>
          <li>Launch the Q1 phishing simulation for 250 new hires.</li>
          <li>Approve 4 pending SOC escalation workflows.</li>
        </ul>
      </div>
    </section>
  );
}
