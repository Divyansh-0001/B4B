import Link from "next/link";
import { notFound } from "next/navigation";

const dashboardCopy = {
  admin: {
    title: "Admin dashboard",
    intro:
      "Control user access, manage content, and review system-wide activity. Designed for fast review with minimal noise.",
    sections: [
      {
        title: "User management",
        description:
          "Create accounts, update roles, and disable access when security posture changes.",
        items: ["Create user", "Update role", "Reset credentials", "Disable access"],
      },
      {
        title: "Content control",
        description:
          "Review published content and adjust visibility for client-facing resources.",
        items: ["Publish report", "Update advisory notes", "Archive outdated content"],
      },
    ],
  },
  client: {
    title: "Client dashboard",
    intro:
      "Track reports and maintain a clean record of current engagement status. Built for quick access to deliverables.",
    sections: [
      {
        title: "Reports",
        description: "Reports will appear here once delivered.",
        items: ["Initial assessment (pending)", "Retest validation (scheduled)"],
      },
      {
        title: "Profile",
        description: "Keep contact details and escalation paths current.",
        items: ["Primary contact", "Escalation contact", "Notification preferences"],
      },
    ],
  },
  user: {
    title: "User dashboard",
    intro:
      "Access assigned requests, updates, and guidance. Everything is intentionally text-first for fast review.",
    sections: [
      {
        title: "Profile",
        description: "Update your role details and preferred contact channels.",
        items: ["Contact email", "Notification settings", "Security clearance level"],
      },
      {
        title: "Requests",
        description: "Open items and actions requiring attention.",
        items: ["Pending questionnaire", "Evidence upload", "Remediation confirmation"],
      },
    ],
  },
} as const;

type RoleKey = keyof typeof dashboardCopy;

export default function DashboardPage({ params }: { params: { role: string } }) {
  const role = params.role as RoleKey;
  const content = dashboardCopy[role];

  if (!content) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container-wide space-y-10">
        <div className="space-y-4">
          <h1 className="text-ink">{content.title}</h1>
          <p className="max-w-2xl text-steel">{content.intro}</p>
          <div className="flex flex-wrap gap-4 text-sm text-steel">
            <span className="rounded-full border border-frost bg-white px-4 py-2">
              Fast load
            </span>
            <span className="rounded-full border border-frost bg-white px-4 py-2">
              Text-first
            </span>
            <span className="rounded-full border border-frost bg-white px-4 py-2">
              No animations
            </span>
          </div>
        </div>

        <div className="grid-2">
          {content.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-frost bg-white p-6 transition hover:border-brand/40"
            >
              <h2 className="text-ink">{section.title}</h2>
              <p className="mt-3 text-steel">{section.description}</p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="text-ink">System notes</h3>
          <p className="mt-3 text-steel">
            This dashboard is intentionally minimal. Connect it to backend data and role-based
            permissions as needed.
          </p>
          <Link href="/" className="mt-4 inline-flex text-sm font-semibold text-brand">
            Back to overview
          </Link>
        </div>
      </div>
    </section>
  );
}
