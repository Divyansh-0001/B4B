import Link from "next/link";
import { notFound } from "next/navigation";

const roleContent: Record<string, { title: string; description: string }> = {
  admin: {
    title: "Admin dashboard",
    description:
      "Manage organization-wide security posture, reporting, and governance workflows.",
  },
  client: {
    title: "Client dashboard",
    description:
      "Track engagement status, findings, and remediation tasks for your organization.",
  },
  user: {
    title: "User dashboard",
    description:
      "Review assigned tasks, access reports, and collaborate with your security team.",
  },
};

export default function DashboardPage({ params }: { params: { role: string } }) {
  const role = params.role;
  const content = roleContent[role];

  if (!content) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container-wide">
        <div className="card-lg max-w-2xl space-y-4">
          <h1 className="text-ink">{content.title}</h1>
          <p className="text-steel">{content.description}</p>
          <p className="text-sm text-steel">
            This is a placeholder view. Connect it to backend data and workflows as needed.
          </p>
          <Link href="/" className="text-sm font-semibold text-brand">
            Back to overview
          </Link>
        </div>
      </div>
    </section>
  );
}
