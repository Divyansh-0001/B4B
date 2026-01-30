import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#3b82f6",
        "brand-cyan": "#22d3ee",
        "brand-purple": "#8b5cf6",
        "brand-violet": "#7c3aed",
        "brand-red": "#ef4444",
        "brand-neon": "#a3e635"
      },
      boxShadow: {
        glow: "0 0 32px rgba(34, 211, 238, 0.25)",
        violet: "0 0 36px rgba(124, 58, 237, 0.3)",
        ember: "0 0 30px rgba(239, 68, 68, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
