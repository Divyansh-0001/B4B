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
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30"
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
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30"
          />
        </div>
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 18px 40px -28px rgba(59, 130, 246, 0.8)" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30"
        >
          Continue securely
        </motion.button>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <motion.button
          whileHover={{ y: -2, borderColor: "rgba(255, 255, 255, 0.6)" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition"
        >
          Sign in with Google
        </motion.button>
      </form>
    </motion.div>
  );
}
