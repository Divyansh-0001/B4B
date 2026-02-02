"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
};

export default function Parallax({
  children,
  className,
  offset = 24
}: ParallaxProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.3 });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        style={{ y: smoothY }}
        className={`${className} parallax-layer`}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
