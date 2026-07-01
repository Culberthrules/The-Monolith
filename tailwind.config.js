/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: '#0a0a0a',
        accent: '#c5a26e',        // Elegant Gold
        'accent-dark': '#a67c52',
      }
    },
  },
  plugins: [],
}