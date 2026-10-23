import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F1EA",
        ink: "#171717",
        charcoal: "#252525",
        champagne: "#C9B79C",
        coral: "#F0452B",
      },
      fontFamily: {
        serif: ["var(--font-instrument)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        anton: ["var(--font-anton)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.055em",
        widest2: "0.3em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        power: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
