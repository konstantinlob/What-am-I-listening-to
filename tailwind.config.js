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
      gray: "#4F4F4F",
      "white": "#FFFFFF",
      "spotify-green": "#1DB954",
      "purple": "#6D3CB4",
      "spotify-black": "#191414",
    },
    borderRadius: {
      "full": "999px",
      "lg": "20px",
      "md": "10px",
    },
  },
  plugins: [],
}
