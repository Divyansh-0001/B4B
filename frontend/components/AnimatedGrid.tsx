"use client";

import { motion } from "framer-motion";

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(69, 243, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(69, 243, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          backgroundPosition: "center"
        }}
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-neon/20 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
