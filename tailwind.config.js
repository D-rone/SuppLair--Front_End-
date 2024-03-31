/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Raleway: "Raleway",
      },
      colors: {
        supplair: {
          primary: "#0D6EFD",
          secondary: "#2D324A",
          sidebar: "#F7F7FE",
          popUpOverlay: "rgba(0, 0, 0, 0.2)",
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
