"use client";

import type { Transition, Variants } from "framer-motion";

export type MotionPreset = "fade" | "slide" | "reveal";

export const motionEase: Transition["ease"] = [0.22, 1, 0.36, 1];

export const motionTransition: Transition = {
  duration: 0.8,
  ease: motionEase,
};

export const motionPresets: Record<MotionPreset, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  reveal: {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};
