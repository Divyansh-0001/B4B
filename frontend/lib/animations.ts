/**
 * Framer Motion animation utilities with reduced-motion support
 */

import { Variants, Transition } from "framer-motion";

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Default transition with reduced-motion support
export const transition = (duration: number = 0.3): Transition => ({
  duration: prefersReducedMotion() ? 0.01 : duration,
  ease: "easeOut",
});

// Spring transition with reduced-motion support
export const springTransition = (): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }
  return {
    type: "spring",
    stiffness: 380,
    damping: 30,
  };
};

/**
 * Fade In Animation
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transition(0.3) },
  exit: { opacity: 0, transition: transition(0.2) },
};

/**
 * Fade In Up Animation
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: prefersReducedMotion() ? 0 : 20 },
  animate: { opacity: 1, y: 0, transition: transition(0.4) },
  exit: { opacity: 0, y: prefersReducedMotion() ? 0 : -20, transition: transition(0.2) },
};

/**
 * Fade In Down Animation
 */
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: prefersReducedMotion() ? 0 : -20 },
  animate: { opacity: 1, y: 0, transition: transition(0.4) },
  exit: { opacity: 0, y: prefersReducedMotion() ? 0 : 20, transition: transition(0.2) },
};

/**
 * Slide In Left Animation
 */
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: prefersReducedMotion() ? 0 : -50 },
  animate: { opacity: 1, x: 0, transition: transition(0.5) },
  exit: { opacity: 0, x: prefersReducedMotion() ? 0 : -50, transition: transition(0.3) },
};

/**
 * Slide In Right Animation
 */
export const slideInRight: Variants = {
  initial: { opacity: 0, x: prefersReducedMotion() ? 0 : 50 },
  animate: { opacity: 1, x: 0, transition: transition(0.5) },
  exit: { opacity: 0, x: prefersReducedMotion() ? 0 : 50, transition: transition(0.3) },
};

/**
 * Scale In Animation
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: prefersReducedMotion() ? 1 : 0.9 },
  animate: { opacity: 1, scale: 1, transition: transition(0.3) },
  exit: { opacity: 0, scale: prefersReducedMotion() ? 1 : 0.9, transition: transition(0.2) },
};

/**
 * Stagger Container Animation
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
};

/**
 * Stagger Item Animation
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: prefersReducedMotion() ? 0 : 20 },
  animate: { opacity: 1, y: 0, transition: transition(0.3) },
};

/**
 * Button Hover Animation
 */
export const buttonHover = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: springTransition(),
};

/**
 * Button Tap Animation
 */
export const buttonTap = {
  scale: prefersReducedMotion() ? 1 : 0.95,
};

/**
 * Card Hover Animation
 */
export const cardHover = {
  y: prefersReducedMotion() ? 0 : -4,
  transition: springTransition(),
};

/**
 * Modal/Dialog Animation
 */
export const modal: Variants = {
  initial: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.95,
    y: prefersReducedMotion() ? 0 : 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transition(0.2),
  },
  exit: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.95,
    y: prefersReducedMotion() ? 0 : 20,
    transition: transition(0.15),
  },
};

/**
 * Backdrop Animation
 */
export const backdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transition(0.2) },
  exit: { opacity: 0, transition: transition(0.15) },
};
