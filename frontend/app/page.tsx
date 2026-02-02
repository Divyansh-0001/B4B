import Parallax from "../components/motion/Parallax";
import RevealSection from "../components/motion/RevealSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <Parallax className="pointer-events-none absolute -top-24 right-[-10%]">
          <div className="glow-orb" />
        </Parallax>
        <Parallax className="pointer-events-none absolute bottom-[-20%] left-[-12%]" offset={18}>
          <div className="glow-orb glow-orb--soft" />
        </Parallax>

        <div className="layout-container ds-section">
          <div className="layout-grid items-center">
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <RevealSection className="space-y-3" delay={0} as="div">
                <p className="ds-eyebrow">Be4Breach Intelligence</p>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Clarity-first cybersecurity for modern infrastructure
                </h1>
              </RevealSection>

              <RevealSection delay={0.1} as="div">
                <p className="text-lg text-muted-foreground">
                  Monitor risk, surface exposures, and respond with confidence using a
                  calm, elegant interface built for security teams.
                </p>
              </RevealSection>

              <RevealSection delay={0.2} className="flex flex-wrap gap-3" as="div">
                <span className="ds-chip">Continuous visibility</span>
                <span className="ds-chip">Actionable context</span>
                <span className="ds-chip">Secure by design</span>
              </RevealSection>

              <RevealSection delay={0.25} className="flex flex-wrap gap-4" as="div">
                <button className="ds-button" type="button">
                  Explore platform
                </button>
                <a className="ds-link" href="#capabilities">
                  See capabilities
                </a>
              </RevealSection>
            </div>

            <RevealSection
              className="col-span-12 mt-12 grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:mt-0"
              delay={0.15}
              as="div"
            >
              {[
                {
                  title: "Signal over noise",
                  description:
                    "Prioritized alerts with context, remediation paths, and ownership."
                },
                {
                  title: "Risk posture",
                  description:
                    "Live summaries for asset exposure, identity drift, and policy gaps."
                },
                {
                  title: "Incident readiness",
                  description:
                    "Real-time playbooks and coordination across operational teams."
                },
                {
                  title: "Compliance clarity",
                  description:
                    "Audit-friendly reporting without the manual overhead."
                }
              ].map((item) => (
                <div className="ds-card" key={item.title}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </RevealSection>
          </div>
        </div>
      </section>

      <RevealSection className="ds-section" once>
        <div className="layout-container" id="capabilities">
          <div className="layout-grid">
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <p className="ds-eyebrow">Capabilities</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Built for the teams defending critical systems
              </h2>
              <p className="text-base text-muted-foreground">
                A precise, minimal interface paired with secure workflows for modern
                security operations.
              </p>
            </div>
            <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {[
                "Risk intelligence",
                "Exposure tracking",
                "Identity monitoring",
                "Secure reporting"
              ].map((title) => (
                <div className="ds-card" key={title}>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Structured telemetry and alerts designed to keep decisions fast and
                    informed.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" once>
        <div className="layout-container">
          <div className="ds-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ds-eyebrow">Assurance</p>
              <h3 className="text-2xl font-semibold tracking-tight">
                Trustworthy signals, delivered with composure
              </h3>
            </div>
            <div className="text-sm text-muted-foreground">
              Every interaction is optimized for focus, clarity, and resilience.
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
