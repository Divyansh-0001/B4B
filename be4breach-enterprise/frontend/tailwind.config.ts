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
        "brand-purple": "#8b5cf6"
      }
    }
  },
  plugins: []
};

export default config;
