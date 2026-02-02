import RoleGate from "../../../components/auth/RoleGate";

const highlights = [
  "Security posture summary across enterprise assets",
  "Incident readiness status and response effectiveness",
  "Compliance progress and audit readiness snapshots",
  "Managed defense coverage with threat intelligence insights"
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RoleGate requiredRole="admin">
        <section className="ds-section">
          <div className="layout-container space-y-6">
            <div>
              <p className="ds-eyebrow">Admin dashboard</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Enterprise security oversight in one place.
              </h1>
            </div>
            <div className="ds-card">
              <ul className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </RoleGate>
    </main>
  );
}
