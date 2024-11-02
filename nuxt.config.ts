// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-10-11",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  future: { compatibilityVersion: 4 },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "nuxt-authorization",
  ],
  runtimeConfig: {
    oauth: {
      twitch: {
        clientId: "",
        clientSecret: "",
        redirectURL: "",
      },
    },
  },
  routeRules: {
    "/api/public/**": { cors: true },
    "/p": { redirect: "/" },
  },
});
