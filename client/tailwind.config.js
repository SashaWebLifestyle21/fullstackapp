/** @type {import('tailwindcss').Config} */
// @type import withMT from "@material-tailwind/react/utils/withMT"
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#143550',
      secondary: '#DB2C6F',
      grey: '#9CA3A8',
      lightGrey: '#C1C4C6',
      darkPrimary: '#0D2334',
      white: '#FDFEFF',
      black: '#08151F',
      lightPrimary: '#1D4E75',
      darkSecondary: '#55112B',
      lightSecondary: '#901D49',
      moreDarkSecondary: '#55112B',
      footer: '#EBEBEB',
      darkBlue: '#483D8B',
      saddleBrown: '#8B4513',
      red: '#FF0000',
      deepSkyBlue: '#00BFFF'

    },
    fontWeight: {
      regular: 400,
      semiBold: 600,
      bold: 700
    },
    container: {
      padding: '16px',
    },
    extend: {},
  },
  plugins: [],
})