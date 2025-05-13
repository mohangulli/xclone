import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", // optional default light theme
      {
        black: {
          primary: "#1D9BF0",
          secondary: "#181818",
          accent: "#1D9BF0",
          neutral: "#000000",
          "base-100": "#000000",       // background
          "base-content": "#FFFFFF",   // text
        },
      },
    ],
  },
};
