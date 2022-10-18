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
        'dusk': '#171922',
        'gray': '#1B1E26',
        'lightGray': '#323643',
        'purple': '#1A1E2C',
        'lavenderBlue': '#6067FF',
        'lightPink': '#FDEAFF',
        'white': '#FFF',
        'red': '#d90000',
      },
    },
    fontFamily: {
      serif: ['ui-serif', 'Georgia',],
    }
  },
  plugins: [
    plugin((({addUtilities}) => {
      addUtilities({
        'content-container': `flex-1 px-3`,
        'h1': `tracking-0.1 font-medium text-4xl text-white`,
        'h2': `tracking-0.1 font-medium text-3xl text-white`,
        'h3': `tracking-0.1 font-medium text-2xl text-white`,
        'h4': `leading-loose font-medium text-xl text-white`,
        'h5': `font-medium text-lg`,
        'p': `font-medium text-[17px] text-white`,
        'p2': `text-base text-white`
      })
    }))
  ],
}
