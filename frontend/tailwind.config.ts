import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#05070d",
        void: "#0b1020",
        slate: "#10172a",
        neon: "#45f3ff",
        ember: "#f6a83b",
        pulse: "#8b5cf6",
        signal: "#22d3ee",
        warn: "#f97316",
        critical: "#f43f5e"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      boxShadow: {
        glow: "0 0 20px rgba(69, 243, 255, 0.35)",
        ember: "0 0 24px rgba(246, 168, 59, 0.3)"
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-40%)", opacity: "0" },
          "50%": { opacity: "0.4" },
          "100%": { transform: "translateY(140%)", opacity: "0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        scanline: "scanline 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
