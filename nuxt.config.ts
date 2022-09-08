import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: 'static',
    app: {
      baseURL: "/What-am-I-listening-to/",
      buildAssetsDir: "nuxt"  // default: _nuxt
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
