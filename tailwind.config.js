/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stc: {
          burgundy: '#4A0E2E',
          burgundyDark: '#32081E',
          navy: '#0B0F19',
          navyCard: '#131927',
          red: '#DC2626',
          offwhite: '#FAFAFA',
          muted: '#8E9AAF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}