import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
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
        },
      },
      fontFamily: {
        grace: "var(--font-grace)",
      },
    },
  },
  plugins: [],
};
export default config;
