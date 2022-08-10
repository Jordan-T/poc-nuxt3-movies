import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    tmdbKey: process.env.THE_MOVIE_DB_KEY,
  },

  meta: {
    link: [
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap",
      },
    ],
  },

  css: ["~/assets/scss/main.scss"],

  modules: ["@nuxtjs/color-mode"],

  build: {
    loaders: {
      sass: {
        additionalData:
          '@use "sass:math"; @import "~/assets/scss/imports.scss";',
        // sassOptions: {
        //   quietDeps: true,
        // },
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "sass:math"; @import "~/assets/scss/imports.scss";',
        },
      },
    },
  },
});
