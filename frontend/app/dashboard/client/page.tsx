import RoleGate from "../../../components/auth/RoleGate";

const highlights = [
  "Service delivery milestones and engagement progress",
  "Risk findings prioritized by business impact",
  "Audit and compliance readiness tracking",
  "Secure communication and reporting cadence"
];

export default function ClientDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RoleGate requiredRole="client">
        <section className="ds-section">
          <div className="layout-container space-y-6">
            <div>
              <p className="ds-eyebrow">Client dashboard</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Engagement clarity with aligned security outcomes.
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
