"use client";

import { m, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

import { motionPresets, motionTransition, type MotionPreset } from "./presets";

export function Reveal({
  children,
  delay = 0,
  className,
  preset = "reveal",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  preset?: MotionPreset;
}) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? motionPresets.fade : motionPresets[preset];

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      transition={{ ...motionTransition, delay }}
      viewport={{ once: true, margin: "-10%" }}
      className={clsx(className)}
    >
      {children}
    </m.div>
  );
}
