"use client";

import { m, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import { motionTransition } from "@/components/motion/presets";

const segments = [
  { text: "Cinematic cybersecurity", className: "" },
  { text: "built to outpace", className: "text-gradient" },
  { text: "modern adversaries.", className: "" },
];

export default function HeroHeadline() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

  return (
    <m.h1
      className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants}
    >
      {segments.map((segment, index) => (
        <m.span
          key={segment.text}
          className={clsx("inline-block", segment.className)}
          variants={itemVariants}
          transition={{ ...motionTransition, duration: 1 }}
        >
          {segment.text}
          {index < segments.length - 1 ? " " : ""}
        </m.span>
      ))}
    </m.h1>
  );
}
