/**** Tailwind CSS Config ****/ 
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f8ff',
          100: '#e0f0ff',
          200: '#b9e0ff',
          300: '#7cc5ff',
          400: '#36a8ff',
          500: '#068dff',
          600: '#006fd6',
          700: '#0056aa',
          800: '#004a8d',
          900: '#063d6d',
          950: '#042747'
        }
      }
    }
  },
  plugins: []
};
