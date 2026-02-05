"use client";

import { motion } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { buttonHover, buttonTap } from "@/lib/animations";

export function AnimatedButton({ children, ...props }: ButtonProps) {
  return (
    <motion.div whileHover={buttonHover} whileTap={buttonTap}>
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
