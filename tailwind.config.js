/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can add your brand colors here (like MockSprint indigo)
        brand: '#6366F1',
      }
    },
  },
  plugins: [],
}