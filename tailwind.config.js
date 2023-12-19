/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#F15E56",
        "custom-yellow": "#FCE180",
      },
      backgroundImage: {
        "graph-paper":
          "repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 3px, transparent 30px), repeating-linear-gradient(90deg, #ccc, #ccc 1px, transparent 3px, transparent 30px)",
      },
      screens: {
        xs: "375px", // Custom extra-small breakpoint
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px", // Custom extra-large breakpoint
      },
    },
  },
  plugins: [],
};
