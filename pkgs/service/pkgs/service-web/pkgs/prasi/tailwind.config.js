const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./form/**/*.{js,jsx,ts,tsx,css}",
    "./editor/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
    },
  },
  blocklist: [
    "flex",
    "flex-row",
    "flex-row-reverse",
    "flex-col",
    "flex-col-reverse",
    "relative",
    "absolute",
    "fixed",
    "items-center",
    "items-stretch",
    "items-start",
    "items-end",
    "justify-between",
    "justify-center",
    "justify-start",
    "justify-end",
  ],
};
