/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      "white": "#FFFFFF",
      "spotify-green": "#1DB954",
      "purple": "#6D3CB4",
      "spotify-black": "#191414",
    },
    borderRadius: {
      "lg": "20px",
    },
  },
  plugins: [],
}