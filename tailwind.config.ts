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
          500: "#4BAF47",
          100: "#F8F7F0",
        },
        secondary: {
          500: "#EEC044",
        },
        neutral: {
          "text-primary": "#1F1E17",
          "text-secondary": "#878680",
          bg: "#FFFFFF",
          "bg-secondary": "#F8F7F0",
          "bg-footer": "#24231D",
          placeholder: "#9ca3af",
        },
      },
      fontFamily: {
        grace: "var(--font-grace)",
      },
      boxShadow: {
        primary: "0 0 0 4px #4BAF4744",
        secondary: "0 0 0 4px #EEC04444",
      },
    },
  },
  plugins: [],
};
export default config;
