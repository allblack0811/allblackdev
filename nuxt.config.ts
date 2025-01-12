import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

function resolvePath(...paths: string[]) {
  return resolve(DIR_NAME, ...paths);
}

export default defineNuxtConfig({
  appId: "allblack's blog",
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@nuxt/fonts",
  ],
  ssr: false,
  devtools: { enabled: true },
  // css: ["~/assets/css/main.css"],
  alias: {
    "@": resolvePath(__dirname),
    "#": resolvePath(__dirname, "features"),
  },
  compatibilityDate: "2024-04-03",
  nitro: {
    preset: "node-server",
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
    checker: true,
  },
  fonts: {},
  tailwindcss: {
    config: {
      content: ["./features/**/*.vue"],
    },
  },
});
