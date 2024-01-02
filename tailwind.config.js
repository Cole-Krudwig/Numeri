/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#F15E56",
        "custom-yellow": "#FCE180",
        "custom-teal": "#00ada8",
        "custom-tan": "#f3e5d0",
        "custom-green-gray": "#7ea296",
        "custom-green-dark": "#56776c",
        "custom-salmon": "#f47056",
        "custom-gray": "#e7e8e3",
      },
      backgroundImage: {
        "graph-paper":
          "repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 3px, transparent 30px), repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 3px, transparent 30px)",
      },
      screens: {
        xxs: "400px",
        xs: "540px", // Custom extra-small breakpoint
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px", // Custom extra-large breakpoint
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
