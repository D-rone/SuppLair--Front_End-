/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        supplair: {
          primary: "#0D6EFD",
          secondary: "#2D324A",
          sidebar: "#F7F7FE",
        },
      },
      fontFamily: {
        raleway: ["Raleway"],
      },
      spacing: {
        _pageBody: "calc(100vh - 56px)",
      },
    },
  },
  plugins: [],
};
