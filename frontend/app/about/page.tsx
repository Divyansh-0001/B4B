import RevealSection from "../../components/motion/RevealSection";

const values = [
  "Protection of critical data against leakage, tampering, or loss.",
  "Economically viable approaches to long-term security.",
  "In-depth communication throughout engagements.",
  "Long-term security solutions that remain affordable.",
  "Excellent post-engagement support and customer care.",
  "Products and services that can be relied upon and trusted."
];

const differentiators = [
  {
    title: "Vendor-neutral perspective",
    description:
      "Assessments focus on your assets without favoring any single vendor."
  },
  {
    title: "Industry expertise",
    description:
      "Expert guidance helps meet compliance standards without sacrificing productivity."
  },
  {
    title: "Over a decade of experience",
    description:
      "Knowledge built through years of engagement across security domains."
  },
  {
    title: "Benchmark standards",
    description:
      "Cloud strategy evaluations are aligned with industry-leading benchmarks."
  },
  {
    title: "International frameworks",
    description:
      "Guidance draws from OWASP, CSA, NIST, ENISA, and CCM frameworks."
  },
  {
    title: "Robust risk assessment",
    description:
      "Assessment frameworks target cloud risks around access, isolation, and availability."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RevealSection className="ds-section" as="section">
        <div className="layout-container space-y-6">
          <div className="space-y-3">
            <p className="ds-eyebrow">About Be4Breach</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              A Pune-based cybersecurity company protecting information worldwide.
            </h1>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Be4Breach was inspired by the mission to protect information across the
            globe. The team is recognized for penetration testing, cloud security, and
            next-gen cybersecurity services, with strategic partnerships across banking,
            healthcare, FinTech, and IT.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container grid gap-6 lg:grid-cols-2">
          <div className="ds-card space-y-4">
            <p className="ds-eyebrow">Mission</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Build lasting, mutually beneficial collaborations worldwide.
            </h2>
            <p className="text-sm text-muted-foreground">
              Be4Breach aims to extend services and products to more organizations while
              reinforcing security procedures that make it harder for attackers to
              succeed. Long-term success is tied to client outcomes and trust.
            </p>
          </div>
          <div className="ds-card space-y-4">
            <p className="ds-eyebrow">Vision</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Security aligned to risk appetite in a rapidly evolving threat landscape.
            </h2>
            <p className="text-sm text-muted-foreground">
              As software innovation accelerates, Be4Breach focuses on protecting
              information and applications from unauthorized access, manipulation, theft,
              and interruption through comprehensive security solutions.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="ds-eyebrow">Values</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Practical, dependable security with long-term support.
            </h2>
            <p className="text-base text-muted-foreground">
              The Be4Breach team emphasizes clear communication, reliable services, and
              economically sustainable security programs.
            </p>
          </div>
          <div className="ds-card">
            <ul className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container">
          <div className="space-y-4">
            <p className="ds-eyebrow">Why Be4Breach</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Expertise rooted in industry benchmarks and proven frameworks.
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div className="ds-card" key={item.title}>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
