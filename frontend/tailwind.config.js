/** @type {import('tailwindcss').Config} */
module.exports = {
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
          950: "#05070b",
        },
        lumina: {
          cyan: "#39d0ff",
          violet: "#9b7bff",
          red: "#ff5263",
          electric: "#4f8bff",
          silver: "#d1d7e3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plex)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 700px at 20% -10%, rgba(57, 208, 255, 0.22), transparent 60%), radial-gradient(900px 500px at 85% 5%, rgba(79, 139, 255, 0.18), transparent 65%), radial-gradient(700px 400px at 50% -20%, rgba(155, 123, 255, 0.18), transparent 70%)",
        "grid-glow":
          "linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
        nebula:
          "radial-gradient(600px 320px at 70% 30%, rgba(255, 82, 99, 0.16), transparent 70%), radial-gradient(500px 320px at 10% 40%, rgba(57, 208, 255, 0.14), transparent 70%)",
        "depth-fade":
          "linear-gradient(180deg, rgba(5, 7, 11, 0) 0%, rgba(5, 7, 11, 0.85) 70%, rgba(5, 7, 11, 1) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(79, 139, 255, 0.16), 0 0 70px rgba(57, 208, 255, 0.12)",
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
        gridDrift: {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "140px 140px" },
        },
        noiseShift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-2%, -2%, 0)" },
          "100%": { transform: "translate3d(2%, 2%, 0)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        floatSlow: "floatSlow 12s ease-in-out infinite",
        gridDrift: "gridDrift 28s linear infinite",
        noiseShift: "noiseShift 10s steps(10) infinite",
      },
    },
  },
  plugins: [],
};
