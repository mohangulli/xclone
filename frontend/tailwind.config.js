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
      "black",
      {
        black: {
          "primary": "rgb(29, 155, 240)",
          "secondary": "rgb(24, 24, 24)",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#1f2937",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
};
