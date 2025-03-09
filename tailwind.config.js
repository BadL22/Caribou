/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files inside src/
    "./public/index.html", // Scan the main HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
