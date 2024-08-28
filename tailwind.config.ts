/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headingFont: ["var(--font-headingFont)"],
        bodyFont: ["var(--font-bodyFont)"],
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-out": "fade-out 0.3s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "black-to-navy": "linear-gradient(to bottom right, #000000, #000080", // custom gradient
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
  ],
};
