"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import { services } from "@/lib/content";
import { motionTransition } from "@/components/motion/presets";

export default function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = services[activeIndex];

  const entryOffset = shouldReduceMotion ? 0 : 18;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: entryOffset },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <m.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-6 top-6 h-px w-32 bg-gradient-to-r from-transparent via-lumina-cyan/70 to-transparent shadow-glow" />
        <div className="absolute right-0 top-16 h-px w-44 bg-gradient-to-r from-transparent via-lumina-violet/60 to-transparent shadow-glow" />
        <div className="absolute bottom-8 left-1/3 h-px w-52 bg-gradient-to-r from-transparent via-lumina-red/50 to-transparent shadow-glow" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <m.div variants={itemVariants} className="space-y-3">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={clsx(
                  "group w-full rounded-2xl border px-4 py-4 text-left transition duration-300 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lumina-cyan/60",
                  isActive
                    ? "border-lumina-cyan/40 bg-white/5 shadow-[0_0_24px_rgba(57,208,255,0.15)]"
                    : "border-white/10 bg-white/0 hover:border-white/30 hover:bg-white/5",
                )}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white transition group-hover:text-white">
                    {service.title}
                  </span>
                  <span
                    className={clsx(
                      "h-1.5 w-1.5 rounded-full transition",
                      isActive ? "bg-lumina-cyan shadow-glow" : "bg-white/25 group-hover:bg-white/50",
                    )}
                  />
                </span>
              </button>
            );
          })}
        </m.div>

        <m.div variants={itemVariants} className="glass-panel relative overflow-hidden rounded-[32px] p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <AnimatePresence mode="wait">
            <m.div
              key={active.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ ...motionTransition, duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-white">{active.title}</h3>
              <p className="mt-4 text-sm text-white/70">{active.description}</p>
            </m.div>
          </AnimatePresence>
        </m.div>
      </div>
    </m.div>
  );
}
