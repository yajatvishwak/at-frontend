/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm: ["DM Sans"],
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
