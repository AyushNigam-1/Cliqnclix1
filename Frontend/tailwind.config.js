/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        '2xl': '1px 1px 5px rgb(33 34 43 / 20%)',
        '3xl': '0 0 20px #d3d3d3, 0 0 40px #d3d3d3, 0 0 80px #d3d3d3, 0 0 160px #d3d3d3 , 0 0 80px #d3d3d3',
      },
      fontFamily: {
        "mullish": ["Mulish", "sans-serif"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwindcss-textshadow')
  ],

}

