"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travelPrimary = shouldReduceMotion ? 0 : 36;
  const travelSecondary = shouldReduceMotion ? 0 : -28;

  const yPrimary = useTransform(scrollYProgress, [0, 1], [0, travelPrimary]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [0, travelSecondary]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <m.div
        style={{ y: yPrimary }}
        className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,139,255,0.25),transparent_70%)] blur-2xl"
      />
      <m.div
        style={{ y: ySecondary }}
        className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(57,208,255,0.18),transparent_70%)] blur-3xl"
      />
      <m.div
        style={{ y: yPrimary }}
        className="absolute -bottom-24 left-0 h-64 w-64 -translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(255,82,99,0.16),transparent_70%)] blur-3xl"
      />
    </div>
  );
}
