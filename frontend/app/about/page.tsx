import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import HologramCard from "../../components/HologramCard";
import MetricTile from "../../components/MetricTile";
import Navigation from "../../components/Navigation";
import SectionHeading from "../../components/SectionHeading";

const servicePortfolio = [
  {
    tag: "Service",
    title: "Breach Impact Analysis",
    description:
      "Assess enterprise security posture against real-world attack scenarios and adversarial TTPs."
  },
  {
    tag: "Service",
    title: "Next-Gen Security Services",
    description:
      "Quantify and understand security risks around modern defenses and strategies."
  },
  {
    tag: "Service",
    title: "Penetration Testing",
    description: "Hybrid approach combined with OWASP methodology."
  },
  {
    tag: "Service",
    title: "Cloud Security",
    description:
      "Ensure transformation and scalability of cloud infrastructure with structured assessments."
  },
  {
    tag: "Service",
    title: "Audit and Compliance",
    description:
      "Understand secure architecture guidelines for business needs and evaluate governance, third-party risks, and data privacy."
  },
  {
    tag: "Service",
    title: "Managed Detection and Response",
    description:
      "Pro-active and re-active services to evaluate posture against latest breach TTPs."
  },
  {
    tag: "Service",
    title: "Complete Website Security",
    description: "Website security coverage listed in Be4Breach service catalog."
  }
];

const productLines = [
  {
    tag: "Product Line",
    title: "Security Advisory",
    description:
      "Expert guidance to develop, assess, and harden cybersecurity programs."
  },
  {
    tag: "Product Line",
    title: "Technical Assurance",
    description:
      "Services designed to minimize risk and protect business process effectiveness."
  },
  {
    tag: "Product Line",
    title: "Managed Services",
    description:
      "Around-the-clock monitoring, management, and response to advanced threats."
  },
  {
    tag: "Product Line",
    title: "Cloud Security Maturity",
    description:
      "Threat assessment, optimal access management, and data encryption support."
  },
  {
    tag: "Product Line",
    title: "Defence in Depth",
    description:
      "Layered security using industry benchmarks, firewalls, and encryption."
  },
  {
    tag: "Product Line",
    title: "Zero Trust Orchestration",
    description:
      "Guidance on indicators and controls to prevent unauthorized system changes."
  }
];

const trustSignals = [
  {
    label: "Experience in field",
    value: "10 years",
    detail:
      "Experience gained over the last decade, as stated in Be4Breach materials.",
    accent: "neon"
  },
  {
    label: "Published pricing range",
    value: "Rs. 99,999 - 3,00,000",
    detail: "Pricing range listed publicly on be4breach.com.",
    accent: "ember"
  },
  {
    label: "Advisor consultation",
    value: "30 minutes",
    detail:
      "Free consultation with industry experts to maximize security investments.",
    accent: "pulse"
  }
];

const clientSignals = [
  "Client feedback on the site references gap analysis, audit completion, and post-gap assessment support.",
  "Published testimonials cite forward-looking penetration testing and program augmentation.",
  "Blockchain security audits, penetration testing, and remediation services are highlighted.",
  "Supportive and cooperative audit execution, thorough testing, and clear reporting are noted."
];

export default function AboutPage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-16 pt-28">
        <BackgroundScene />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
            The Agency
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            <GlitchText
              text="The Agency"
              className="drop-shadow-[0_0_12px_rgba(69,243,255,0.5)]"
            />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            A cinematic narrative grounded in real operations. The following
            intelligence brief is drawn from Be4Breach public materials and
            rewritten in a command-center voice without altering the facts.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SectionHeading
            eyebrow="Origin of Be4Breach"
            title="Born from a mandate to protect information worldwide."
            description="Be4Breach was inspired by a desire to protect information across the world and is headquartered in Pune, India."
          />
          <div className="space-y-5 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Headquarters
              </p>
              <p className="mt-2 text-white">
                Greenfield Rd, Amanora Park Town, Hadapsar, Pune, Maharashtra
                411028, India
              </p>
              <p className="mt-2 text-slate-300">
                +91 7597285151 - contact@be4breach.com
              </p>
            </div>
            <div className="h-px bg-white/10" />
            <p>
              The company describes itself as young, ambitious, and creative,
              with leadership in penetration testing, cloud security, and
              next-gen cybersecurity services. It partners with innovative
              organizations in banking, healthcare, FinTech, and IT.
            </p>
            <p>
              Be4Breach states it plays a crucial role in protecting the digital
              world from sophisticated cyberattacks and vulnerabilities and in
              improving outcomes across engagements.
            </p>
            <p>
              It cites extensive knowledge of customer ecosystems built through
              extensive study and many client engagements over many years.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Mission and Vision"
            title="Mutual trust, resilient security, and clarity of purpose."
            description="Be4Breach emphasizes long-term partnerships and security that aligns with business risk."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Mission
              </p>
              <p className="text-white">
                Establish lasting, mutually beneficial collaborations with
                companies around the globe and extend services and products to
                more consumers.
              </p>
              <p>
                Be4Breach believes strong security procedures make it much
                harder for attackers to break in, with protection built into its
                services and products. Long-term success is tied to client
                contentment and referrals.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Vision
              </p>
              <p className="text-white">
                Intruder sophistication is rising as software innovation
                accelerates, requiring security and accessibility measures that
                match each company's risk tolerance.
              </p>
              <p>
                Be4Breach states it guarantees the security of information and
                applications against unauthorized access, manipulation, theft,
                and interruption. It commits to comprehensive security solutions
                that address data leaks, hacks, and intellectual property
                infringement. Trust in this reliability is positioned as the
                engine of growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Intelligence-led Methodology"
            title="Predict threats, close gaps, and engineer resilience."
            description="Be4Breach combines threat intelligence, proactive hunting, and structured assessments to stay ahead of adversarial tactics."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Operational Approach
              </p>
              <ul className="space-y-3">
                <li>
                  24/7 threat defense supported by threat intelligence and
                  proactive threat hunting.
                </li>
                <li>
                  Advanced defense blends offensive testing, managed security
                  services, AI, and incident response.
                </li>
                <li>
                  Hybrid penetration testing approach combined with OWASP
                  methodology.
                </li>
                <li>
                  Vendor-neutral assessments that prioritize productivity while
                  meeting compliance standards.
                </li>
                <li>
                  ROI improvements by maximizing the value of existing security
                  tools and technology.
                </li>
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Standards and Assurance
              </p>
              <ul className="space-y-3">
                <li>
                  International frameworks referenced include OWASP, CSA, NIST,
                  ENISA, and CCM.
                </li>
                <li>
                  Industry-leading benchmark standards are used to evaluate and
                  secure cloud strategies.
                </li>
                <li>
                  State-of-the-art security tools, technology expertise, and
                  domain familiarity support solution engineering.
                </li>
                <li>
                  Assessment framework identifies cloud infrastructure risks
                  related to insider access, auxiliary data, software isolation,
                  and availability.
                </li>
                <li>
                  Engagements include reports outlining analysis results with
                  recommendations for the next steps.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicePortfolio.map((service) => (
              <HologramCard key={service.title} {...service} />
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productLines.map((product) => (
              <HologramCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Why Enterprises Trust Be4Breach"
            title="Measured, transparent, and client-first execution."
            description="The company cites extensive client engagements, long-term value, and reliable support as core trust drivers."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {trustSignals.map((signal) => (
              <MetricTile key={signal.label} {...signal} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Values and Client Care
              </p>
              <ul className="space-y-3">
                <li>
                  Protection of critical data against leakage, tampering, or
                  loss through long-term, economically viable solutions.
                </li>
                <li>
                  Long-term security solutions are designed to stay affordable
                  while sustaining protection.
                </li>
                <li>
                  In-depth communication maintained throughout each engagement.
                </li>
                <li>
                  Post-purchase support and customer care are explicitly
                  emphasized.
                </li>
                <li>
                  Products and services positioned as reliable and trusted.
                </li>
                <li>
                  World-class services at unmatched value are attributed to
                  state-of-the-art tools, technology expertise, and solution
                  engineering aligned to business needs.
                </li>
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Client Feedback Signals
              </p>
              <div className="space-y-3">
                {clientSignals.map((signal) => (
                  <p key={signal}>{signal}</p>
                ))}
                <p className="text-xs uppercase tracking-[0.3em] text-neon/70">
                  Names cited: Car Expert / Top IT Team, Explico, Netsach,
                  BharatVerse, TechDriver, Clevoir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SectionHeading
            eyebrow="Global Threat Perspective"
            title="Security aligned to risk, scale, and modern adversaries."
            description="Be4Breach frames security as a response to rising intruder sophistication and the need for globally aligned defenses."
          />
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate/60 p-6 text-sm text-slate-300 shadow-2xl backdrop-blur">
            <p>
              The company states that intruder capabilities are advancing
              alongside rapid software innovation. Security and accessibility
              measures must align with the level of risk each organization is
              prepared to accept.
            </p>
            <p>
              Be4Breach positions its work as part of protecting the digital
              world, partnering with banking, healthcare, FinTech, and IT
              organizations, and delivering comprehensive solutions against data
              leaks, hacks, and intellectual property infringement.
            </p>
            <p>
              The operational posture emphasizes prediction of threats, closing
              gaps ahead of time, and maintaining protection across global
              collaborations.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Agency Division. Intelligence brief complete.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Trusted. Vigilant. Unified.
          </p>
        </div>
      </footer>
    </main>
  );
}
