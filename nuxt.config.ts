import svgLoader from "vite-svg-loader";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: "static",
    ssr: false,
    app: {
        baseURL: "/What-am-I-listening-to/", // repo name to build correctly for github-pages
    },
    modules: ["@nuxtjs/tailwindcss"],
    vite: {
        plugins: [svgLoader()],
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
    typescript: {
        strict: true,
    },
});
