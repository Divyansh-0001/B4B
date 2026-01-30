"use client";

import { motion } from "framer-motion";

export default function LoginPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-3xl p-8"
    >
      <form className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Work email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:-translate-y-0.5"
        >
          Continue securely
        </button>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <button
          type="button"
          className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/60"
        >
          Sign in with Google
        </button>
      </form>
    </motion.div>
  );
}
