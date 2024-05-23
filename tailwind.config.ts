import type { Config } from "tailwindcss";
import { breakpoints } from "./src/theme/breakpoints";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: breakpoints["2xl"] + "px" },
      xl: { max: breakpoints.xl + "px" },
      lg: { max: breakpoints.lg + "px" },
      md: { max: breakpoints.md + "px" },
      sm: { max: breakpoints.sm + "px" },
    },
    extend: {
      colors: {
        primary: {
          500: "#000000",
          100: "#F8F7F0",
        },
        secondary: {
          500: "#F0A500",
        },
        neutral: {
          "text-primary": "#1F1E17",
          "text-secondary": "#878680",
          bg: "#FFFFFF",
          "bg-secondary": "#F8F7F0",
          "bg-footer": "#000000D9",
          placeholder: "#9ca3af",
        },
      },
      fontFamily: {
        grace: "var(--font-grace)",
      },
      boxShadow: {
        primary: "0 0 0 4px #00000044",
        secondary: "0 0 0 4px #F0A50044",
      },
      keyframes: {
        jump: {
          "20%": { transform: "translateY(20px)" },
          "80%": { transform: "translateY(-40px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
