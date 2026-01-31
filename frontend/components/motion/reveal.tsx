"use client";

import { m } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-10%" }}
      className={clsx(className)}
    >
      {children}
    </m.div>
  );
}
