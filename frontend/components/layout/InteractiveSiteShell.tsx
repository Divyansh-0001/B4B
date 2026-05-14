"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

interface InteractiveSiteShellProps {
  children: ReactNode;
}

const CURSOR_GLOW_SIZE = 360;

export function InteractiveSiteShell({ children }: InteractiveSiteShellProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.35,
  });

  const mouseX = useMotionValue(-CURSOR_GLOW_SIZE);
  const mouseY = useMotionValue(-CURSOR_GLOW_SIZE);
  const smoothMouseX = useSpring(mouseX, { stiffness: 220, damping: 35, mass: 0.3 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 220, damping: 35, mass: 0.3 });

  const spotlight = useMotionTemplate`radial-gradient(${CURSOR_GLOW_SIZE}px circle at center, hsl(var(--primary) / 0.18), transparent 68%)`;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      mouseX.set(event.clientX - CURSOR_GLOW_SIZE / 2);
      mouseY.set(event.clientY - CURSOR_GLOW_SIZE / 2);
    };

    const resetPointer = () => {
      mouseX.set(-CURSOR_GLOW_SIZE);
      mouseY.set(-CURSOR_GLOW_SIZE);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <div className="interactive-root relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="interactive-grid-overlay absolute inset-0" />
        {!shouldReduceMotion && (
          <>
            <div className="interactive-blob interactive-blob--one" />
            <div className="interactive-blob interactive-blob--two" />
          </>
        )}
      </div>

      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-[360px] w-[360px] md:block"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            background: spotlight,
          }}
        />
      )}

      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-primary/40 via-primary to-primary/40"
        style={{ scaleX: scrollProgress }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="relative z-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.42, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
