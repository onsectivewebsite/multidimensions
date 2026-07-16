/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens are driven by CSS variables so the theme can switch at runtime.
        // Values live in globals.css (:root + [data-theme] presets).
        paper: {
          50: "rgb(var(--c-paper-50) / <alpha-value>)",
          100: "rgb(var(--c-paper-100) / <alpha-value>)",
          200: "rgb(var(--c-paper-200) / <alpha-value>)",
        },
        ink: {
          900: "rgb(var(--c-ink-900) / <alpha-value>)",
          800: "rgb(var(--c-ink-800) / <alpha-value>)",
          700: "rgb(var(--c-ink-700) / <alpha-value>)",
          600: "rgb(var(--c-ink-600) / <alpha-value>)",
          500: "rgb(var(--c-ink-500) / <alpha-value>)",
          200: "rgb(var(--c-ink-200) / <alpha-value>)",
          100: "rgb(var(--c-ink-100) / <alpha-value>)",
        },
        // "sign" = primary brand colour
        sign: {
          900: "rgb(var(--c-sign-900) / <alpha-value>)",
          800: "rgb(var(--c-sign-800) / <alpha-value>)",
          700: "rgb(var(--c-sign-700) / <alpha-value>)",
          600: "rgb(var(--c-sign-600) / <alpha-value>)",
          500: "rgb(var(--c-sign-500) / <alpha-value>)",
        },
        // "road" = creative accent pop
        road: {
          500: "rgb(var(--c-road-500) / <alpha-value>)",
          400: "rgb(var(--c-road-400) / <alpha-value>)",
          300: "rgb(var(--c-road-300) / <alpha-value>)",
        },
        amber: {
          500: "rgb(var(--c-amber-500) / <alpha-value>)",
          400: "rgb(var(--c-amber-400) / <alpha-value>)",
        },
        stop: {
          600: "#DC2626",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        // "mono" slot points to the body sans so old font-mono labels read clean, not techy
        mono: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(10,27,51,0.18)",
        lift: "0 26px 60px -18px rgba(10,27,51,0.28)",
        sign: "inset 0 0 0 2px rgba(255,255,255,0.9)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        lane: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-72px 0" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(220%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(24px,-18px) scale(1.1)" },
          "66%": { transform: "translate(-18px,14px) scale(0.95)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        lane: "lane 1.1s linear infinite",
        kenburns: "kenburns 14s ease-out forwards",
        marquee: "marquee 26s linear infinite",
        shine: "shine 2.6s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
