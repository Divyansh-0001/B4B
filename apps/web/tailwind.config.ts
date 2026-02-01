import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        frost: "#e2e8f0",
        steel: "#475569",
        brand: "#0f766e",
        brandSoft: "#ccfbf1",
      },
      boxShadow: {
        soft: "0 12px 24px -20px rgba(15, 23, 42, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
