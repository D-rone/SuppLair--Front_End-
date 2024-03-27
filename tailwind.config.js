/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Raleway': ["Raleway", "sans-serif"]
      },
      colors: {
        supplair: {
          primary: "#0D6EFD",
<<<<<<< HEAD
          secondary: "#2D324A"
=======
          secondary: "#2D324A",
          sidebar: "#F7F7FE",
>>>>>>> 32f3dc54639f007a3181351cad5231c6a3f7a4a3
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
