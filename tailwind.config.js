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
            animation: {
                "fade-in": "fadeIn 1s ease-in-out forwards",
                "move-in-delay-1": "moveIn 1s ease-in-out 1s forwards",
                "move-in-delay-3": "moveIn 1s ease-in-out 3s forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                moveIn: {
                    "0%": {translate: "100vw", opacity: 0},
                    "100%": {opacity: 1, translate: 0},
                }
            },
            transitionProperty: {
                width: "width",
            },
        },
        colors: {
            gray: "#4F4F4F",
            white: "#FFFFFF",
            "spotify-green": "#1DB954",
            purple: "#6D3CB4",
            "spotify-black": "#191414",
        },
        borderRadius: {
            full: "999px",
            lg: "20px",
            md: "10px",
        },
    },
    plugins: [],
};
