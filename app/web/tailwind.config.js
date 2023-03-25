/** @type {import('tailwindcss').Config} */
const color = require("tailwindcss/colors");
const path = require("path");
module.exports = {
  content: [path.join(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {
      colors: {
        primary: color.blue,
      },
    },
  },
  plugins: [],
};
 