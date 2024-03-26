/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        supplair: {
          primary: "#0D6EFD",
          secondary: "#2D324A",
        },
      },
      fontFamily: {
        raleway: ["Raleway"],
      },
      spacing: {
        "1/10": "10%",
        "14.5" : "58px"
      },
    },
  },
  plugins: [],
};
