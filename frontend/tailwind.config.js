/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#06AED5",
          secondary: "#E70E80",
          accent: "#FFCCC9",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
