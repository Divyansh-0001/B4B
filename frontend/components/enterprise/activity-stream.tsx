const activities = [
  {
    title: "SOC alert triaged",
    detail: "Suspicious outbound traffic contained in 11 minutes.",
  },
  {
    title: "Compliance evidence updated",
    detail: "CERT-In reporting package refreshed and signed.",
  },
  {
    title: "VAPT execution complete",
    detail: "Critical findings mapped to remediation backlog.",
  },
];

export default function ActivityStream() {
  return (
    <div className="glass-panel rounded-[28px] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Latest activity</p>
      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <div key={activity.title} className="space-y-1">
            <p className="text-sm font-semibold text-white">{activity.title}</p>
            <p className="text-xs text-white/60">{activity.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
