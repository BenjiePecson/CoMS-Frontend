import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', "sans-serif"],
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "blue",
          secondary: "teal",
        },
      },
      {
        extend: {
          colors: {
            primary: "#273069",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/TPLogin.jpeg')",
      },
      colors: {
        primary: "#273069",
      },
    },
  },
};
