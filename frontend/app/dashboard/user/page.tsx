import RoleGate from "../../../components/auth/RoleGate";

const highlights = [
  "Assigned security tasks and next actions",
  "Operational playbooks and response checklists",
  "Latest threat intelligence highlights",
  "Security training and readiness modules"
];

export default function UserDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RoleGate requiredRole="user">
        <section className="ds-section">
          <div className="layout-container space-y-6">
            <div>
              <p className="ds-eyebrow">User dashboard</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Focused security workflows for day-to-day execution.
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
