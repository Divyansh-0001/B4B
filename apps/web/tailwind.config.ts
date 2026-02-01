import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        mist: "#f7f9fc",
        frost: "#eef2f7",
        steel: "#64748b",
        brand: "#3b82f6",
        brandSoft: "#dbeafe",
      },
      boxShadow: {
        soft: "0 20px 50px -40px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
