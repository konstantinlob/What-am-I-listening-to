import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: 'static',
    ssr: false,
    app: {
      baseURL: "/What-am-I-listening-to/",  // repo name to build correctly for github-pages
      buildAssetsDir: "nuxt"  // default: _nuxt // _nuxt is not accepted by github-pages
    },
    css: ["@/assets/css/tailwind.css"],
    build: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
      },
    },
    modules: ["tailwindcss"],
})
