import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: {
          50: "#f4f7ff",
          100: "#e2e8ff",
          200: "#b9c8ff",
          300: "#8ea6ff",
          400: "#5e7dff",
          500: "#3b59ff",
          600: "#233df2",
          700: "#1b2fbe",
          800: "#14227f",
          900: "#0b0f14",
        },
        lumina: {
          cyan: "#39d0ff",
          violet: "#9b7bff",
          red: "#ff5263",
          silver: "#d1d7e3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 20% -10%, rgba(57, 208, 255, 0.25), transparent), radial-gradient(800px 400px at 80% 0%, rgba(155, 123, 255, 0.25), transparent)",
        "grid-glow":
          "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        "nebula":
          "radial-gradient(600px 300px at 70% 30%, rgba(255, 82, 99, 0.2), transparent), radial-gradient(500px 300px at 10% 40%, rgba(57, 208, 255, 0.2), transparent)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(57, 208, 255, 0.2), 0 0 60px rgba(155, 123, 255, 0.15)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        floatSlow: "floatSlow 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
