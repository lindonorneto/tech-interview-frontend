/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 500ms ease-in-out forwards',
      },
      keyframes: (theme) => ({
        fadeIn: {
          '0%': { opacity: '1' },
          '100%': { backgroundColor: theme('colors.white') },
        },
      }),
    },
  },
  plugins: [],
};
