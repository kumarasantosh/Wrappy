/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wrappy-black": "#0e0e0e",
        "wrappy-cream": "#f9f5ef",
        "wrappy-red": "#ff1e1e",
        "wrappy-orange": "#ff6b35",
        "wrappy-lime": "#d4ff00",
      },
      fontFamily: {
        display: [
          "var(--font-body)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        body: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
