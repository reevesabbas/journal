/** @type {import('tailwindcss').Config} */
const { plugin } = require('twrnc');

module.exports = {
  darkMode: 'class',
  content: ['./src/App.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      screens: {},
      colors: {
        'night': '#12141C',
        'gray': '#21242E',
        'lightGray': '#323643',
        'lavenderBlue': '#6067FF',
        'white': '#FFF',
      },
    },
    fontFamily: {
      serif: ['ui-serif', 'Georgia',],
    }
  },
  plugins: [
    plugin((({addUtilities}) => {
      addUtilities({
        'content-container': `flex-1 mx-5`,
        'h1': `tracking-0.1 font-medium text-4xl text-white`,
        'h2': `tracking-0.1 font-medium text-3xl text-white`,
        'h3': `tracking-0.1 font-medium text-2xl text-white`,
        'h4': `font-medium text-xl text-white`,
        'p': `font-medium text-base text-white`,
      })
    }))
  ],
}
