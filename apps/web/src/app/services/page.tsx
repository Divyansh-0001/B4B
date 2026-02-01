import { PageHero } from "@/components/page-hero";
import { FadeIn } from "@/components/motion";
import { serviceLines } from "@/data/content";

export default function ServicesPage() {
  const midpoint = Math.ceil(serviceLines.length / 2);
  const columns = [serviceLines.slice(0, midpoint), serviceLines.slice(midpoint)];

  return (
    <div>
      <PageHero
        title="Security services"
        subtitle="Technical assessments, offensive testing, and managed defense delivered by senior engineers."
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn className="max-w-3xl">
            <h2 className="text-ink">Overview</h2>
            <p className="mt-3 text-steel">
              Be4Breach provides focused security services for engineering and security leaders who
              need clear risk visibility and actionable remediation steps. Engagements are scoped
              to real systems, measured against realistic adversary behavior, and delivered with
              evidence you can ship.
            </p>
          </FadeIn>

          <FadeIn className="max-w-3xl">
            <h3 className="text-ink">How we work</h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
              <li>Define scope, environments, and success criteria.</li>
              <li>Execute testing with agreed rules of engagement.</li>
              <li>Deliver clear findings, proof of impact, and risk ratings.</li>
              <li>Support remediation with validation and retesting.</li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h3 className="text-ink">Core service catalog</h3>
            <p className="mt-3 text-steel">
              Each service is delivered with technical evidence, remediation guidance, and a
              prioritized plan of action.
            </p>
            <div className="mt-6 grid-2">
              {columns.map((column, columnIndex) => (
                <ul
                  key={`service-column-${columnIndex}`}
                  className="list-inside list-disc space-y-2 text-steel"
                >
                  {column.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="max-w-3xl">
            <h3 className="text-ink">Deliverables</h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
              <li>Executive summary for leadership and governance teams.</li>
              <li>Technical findings with evidence, reproduction steps, and severity.</li>
              <li>Remediation roadmap with prioritized actions.</li>
              <li>Retest validation report on closure.</li>
            </ul>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
