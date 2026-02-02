import Link from "next/link";

import Parallax from "../components/motion/Parallax";
import RevealSection from "../components/motion/RevealSection";

const serviceHighlights = [
  {
    title: "Breach Impact Analysis",
    description:
      "Assess enterprise security posture against real-world attack scenarios and adversarial TTPs."
  },
  {
    title: "Next-Gen Security Services",
    description:
      "Quantify and understand security risks around modern defenses and strategies."
  },
  {
    title: "Penetration Testing",
    description:
      "Hybrid assessments aligned with OWASP methodologies for real-world validation."
  },
  {
    title: "Cloud Security",
    description:
      "Assessment solutions that support secure transformation and scalable cloud infrastructure."
  },
  {
    title: "Audit & Compliance",
    description:
      "Secure architecture and governance coverage for third-party risk, data privacy, and regulation."
  },
  {
    title: "Managed Detection & Response",
    description:
      "Proactive and reactive services to evaluate posture against the latest breach TTPs."
  }
];

const advisoryBlocks = [
  {
    title: "Product Security Advisory",
    description:
      "Accelerate security improvements with expert-led program development and hardening."
  },
  {
    title: "Technical Assurance",
    description:
      "Reduce risk and strengthen the effectiveness of critical business processes."
  },
  {
    title: "Managed Services",
    description:
      "Around-the-clock monitoring, management, and response to advanced threats."
  },
  {
    title: "Cloud Security Maturity",
    description:
      "Threat assessment, optimal access management, and data encryption guidance."
  },
  {
    title: "Defence in Depth",
    description:
      "Layered controls including firewalls, encryption, and resilient security protocols."
  },
  {
    title: "Zero Trust Orchestration",
    description:
      "Guidance on indicators and controls to prevent unauthorized system changes."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <Parallax className="pointer-events-none absolute -top-24 right-[-10%]">
          <div className="glow-orb" />
        </Parallax>
        <Parallax
          className="pointer-events-none absolute bottom-[-20%] left-[-12%]"
          offset={18}
        >
          <div className="glow-orb glow-orb--soft" />
        </Parallax>

        <div className="layout-container ds-section">
          <div className="layout-grid items-center">
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <RevealSection className="space-y-3" delay={0} as="div">
                <p className="ds-eyebrow">Be4Breach Security Services</p>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  24/7 threat defense backed by breach impact analysis and modern
                  security services.
                </h1>
              </RevealSection>

              <RevealSection delay={0.1} as="div">
                <p className="text-lg text-muted-foreground">
                  Be4Breach combines threat intelligence with proactive threat hunting to
                  find threats continuously and respond faster. For advanced risks, we
                  blend offensive testing, managed security services, AI-informed
                  insights, and incident response.
                </p>
              </RevealSection>

              <RevealSection delay={0.2} className="flex flex-wrap gap-3" as="div">
                <span className="ds-chip">Threat intelligence</span>
                <span className="ds-chip">Proactive threat hunting</span>
                <span className="ds-chip">Response readiness</span>
              </RevealSection>

              <RevealSection delay={0.25} className="flex flex-wrap gap-4" as="div">
                <button className="ds-button" type="button">
                  Reserve a free 30-minute consultation
                </button>
                <Link className="ds-link" href="/services">
                  View services
                </Link>
              </RevealSection>
            </div>

            <RevealSection
              className="col-span-12 mt-12 grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:mt-0"
              delay={0.15}
              as="div"
            >
              {serviceHighlights.map((item) => (
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
        <div className="layout-container" id="defense">
          <div className="layout-grid">
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <p className="ds-eyebrow">Defense strategy</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Protecting everything with layered, measurable coverage
              </h2>
              <p className="text-base text-muted-foreground">
                Be4Breach emphasizes continuous defense, combining offensive testing,
                managed security services, AI, and incident response to address advanced
                threats.
              </p>
            </div>
            <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {[
                {
                  title: "24/7 threat defense",
                  description:
                    "Threat intelligence and proactive threat hunting help detect risks at all times."
                },
                {
                  title: "Protecting everything",
                  description:
                    "Offensive testing and managed security services support comprehensive coverage."
                },
                {
                  title: "ROI improvements",
                  description:
                    "Maximize return on existing security tools and technology investments."
                },
                {
                  title: "Incident response readiness",
                  description:
                    "Focused assessments improve preparedness to detect and respond quickly."
                }
              ].map((item) => (
                <div className="ds-card" key={item.title}>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" once>
        <div className="layout-container">
          <div className="layout-grid">
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <p className="ds-eyebrow">Advisory &amp; managed services</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Expert guidance with pragmatic, business-aligned outcomes
              </h2>
              <p className="text-base text-muted-foreground">
                Security advisory and managed services help accelerate improvements,
                harden programs, and sustain long-term resilience.
              </p>
            </div>
            <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {advisoryBlocks.map((item) => (
                <div className="ds-card" key={item.title}>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
