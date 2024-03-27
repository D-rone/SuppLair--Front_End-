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
          secondary: "#2D324A"
        },
      },
    },
  },
  plugins: [],
};
