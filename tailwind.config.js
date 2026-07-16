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
        // White & blue driving-school palette
        paper: {
          50: "#FFFFFF",
          100: "#F2F7FE",
          200: "#E4EEFB",
        },
        ink: {
          900: "#0A1B33",
          800: "#12294A",
          700: "#22364F",
          600: "#47597A",
          500: "#6E7E9B",
          200: "#D5E2F2",
          100: "#E8F0FA",
        },
        // "sign" = primary blue (kept name so existing classes remap)
        sign: {
          900: "#0A2A66",
          800: "#123A86",
          700: "#1D4ED8",
          600: "#2563EB",
          500: "#3B82F6",
        },
        // "road" = bright sky-blue accent
        road: {
          500: "#0EA5E9",
          400: "#38BDF8",
          300: "#7DD3FC",
        },
        amber: {
          500: "#F59E0B",
          400: "#FBBF24",
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
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        lane: "lane 1.1s linear infinite",
      },
    },
  },
  plugins: [],
};
