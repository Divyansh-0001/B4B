import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import HologramCard from "../../components/HologramCard";
import MetricTile from "../../components/MetricTile";
import Navigation from "../../components/Navigation";
import SectionHeading from "../../components/SectionHeading";

const doctrines = [
  {
    tag: "Doctrine",
    title: "Intelligence before action",
    description:
      "Every response is driven by verified telemetry and multi-source correlation."
  },
  {
    tag: "Doctrine",
    title: "Containment with precision",
    description:
      "Threats are isolated with surgical automation to protect mission uptime."
  },
  {
    tag: "Doctrine",
    title: "Partner-first trust",
    description:
      "We operate as an extension of partner security teams with shared authority."
  }
];

const metrics = [
  {
    label: "Global presence",
    value: "32",
    detail: "Regions staffed with rapid response operators.",
    accent: "neon"
  },
  {
    label: "Command readiness",
    value: "24/7",
    detail: "Continuous operations with redundant command pods.",
    accent: "pulse"
  },
  {
    label: "Mission tempo",
    value: "11 min",
    detail: "Average escalation-to-action window.",
    accent: "ember"
  }
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
            <GlitchText text="The Agency" className="text-glow" />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Be4Breach is a covert-aligned cyber defense agency engineered for
            enterprise reality. Our operatives blend cinematic precision with
            compliance-grade operations to keep global partners secure.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Command Doctrine"
            title="Elite operations guided by disciplined intelligence."
            description="Every mission adheres to a strict code of verification, resilience, and partner alignment."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {doctrines.map((doctrine) => (
              <HologramCard key={doctrine.title} {...doctrine} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Global Network"
            title="Distributed command presence with unified oversight."
            description="Regional command pods and partner desks stay synchronized through the Be4Breach command lattice."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SectionHeading
            eyebrow="Leadership Cell"
            title="Command Authority directs every escalation path."
            description="Senior operators maintain mission oversight, escalation readiness, and policy alignment."
          />
          <div className="glass-panel space-y-6 p-6 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Strategic Intelligence
              </p>
              <p className="mt-2 text-white">
                Multi-domain analysts prioritize threats across global theaters.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Crisis Response
              </p>
              <p className="mt-2 text-white">
                Rapid containment leaders coordinate on-demand surge support.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Partner Alliance
              </p>
              <p className="mt-2 text-white">
                Embedded liaison officers secure cross-organization trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Agency Division. All operations classified.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Trusted. Vigilant. Unified.
          </p>
        </div>
      </footer>
    </main>
  );
}
