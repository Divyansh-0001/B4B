"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-white">Be4Breach</p>
          <p className="text-sm text-slate-400">
            Enterprise cybersecurity services, intelligence, and response
            operations.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan">
            Trust indicators
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            {[
              "CERT-In empanelled service provider",
              "ISO 27001 aligned controls",
              "SOC 2 readiness support",
              "GDPR-aligned privacy practices"
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
