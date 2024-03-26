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
        "1/10": "10%",
        11.5: "46px",
        "1/5": "20%",
        _pageBody: "calc(100vh - 56px)",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
