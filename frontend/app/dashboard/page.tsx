import BackgroundScene from "../../components/BackgroundScene";
import DashboardRoleView from "../../components/DashboardRoleView";
import GlitchText from "../../components/GlitchText";
import Navigation from "../../components/Navigation";
import SignalTicker from "../../components/SignalTicker";

export default function DashboardPage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-12 pt-28">
        <BackgroundScene />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
            Command Center
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            <GlitchText
              text="Command Center"
              className="drop-shadow-[0_0_12px_rgba(69,243,255,0.5)]"
            />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Real-time operational oversight, threat telemetry, and partner
            synchronization across the global command lattice.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SignalTicker />
          <DashboardRoleView />
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Command Center. Live operational feed.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Observe. Decide. Execute.
          </p>
        </div>
      </footer>
    </main>
  );
}
