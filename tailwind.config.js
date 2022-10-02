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
        extend: {
            transitionProperty: {
                width: "width",
            },
        },
        colors: {
            white: "#FFFFFF",
            "spotify-green": "#1DB954",
            purple: "#6D3CB4",
            "spotify-black": "#191414",
        },
        borderRadius: {
            lg: "20px",
            md: "10px",
        },
    },
    plugins: [],
};
