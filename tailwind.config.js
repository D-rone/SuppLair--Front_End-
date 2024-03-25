/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        supplair: {
          primary: "#1e86e0ed",
        },
      },
    },
  },
  plugins: [],
};
