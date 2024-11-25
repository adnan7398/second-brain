/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color:{
        purple:{
          300:"#e0e7fe",
          500:"#3e38a7",
          700:"#5046e4",
        }
      }
    },
  },
  plugins: [],
}

