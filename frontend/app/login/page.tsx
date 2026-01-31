import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import Navigation from "../../components/Navigation";

export default function LoginPage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-24 pt-28">
        <BackgroundScene />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
              Secure Access Terminal
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
              <GlitchText text="Secure Access Terminal" className="text-glow" />
            </h1>
            <p className="mt-5 text-lg text-slate-200">
              Authenticate with command-grade credentials or trusted partner SSO
              to enter the Be4Breach command lattice.
            </p>
            <div className="mt-8 glass-card p-6 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Access Protocol
              </p>
              <ul className="mt-4 space-y-3">
                <li>Multi-factor verification enforced on every session.</li>
                <li>RBAC gates protect Command Authority workflows.</li>
                <li>All access events are recorded in immutable audit logs.</li>
              </ul>
            </div>
          </div>
          <div className="glass-panel p-8">
            <form className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Operative Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="operative@be4breach.io"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-abyss/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-neon/70 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Access Code
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="********"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-abyss/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-neon/70 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-neon px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abyss shadow-glow transition hover:scale-[1.01]"
              >
                Authenticate
              </button>
              <div className="grid gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                <button
                  type="button"
                  className="w-full rounded-full border border-white/10 px-4 py-3 text-white/80 transition hover:border-neon/60 hover:text-neon"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full rounded-full border border-white/10 px-4 py-3 text-white/80 transition hover:border-neon/60 hover:text-neon"
                >
                  Request Command Authority
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
