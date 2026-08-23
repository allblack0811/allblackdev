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
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/fonts",
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  // @nuxtjs/seo 사이트 전역 설정
  site: {
    url: "https://allblack.dev",
    name: "allblack's blog",
    description:
      "새롭고 재미있는 것을 만드는 것을 좋아하는 프론트엔드 개발자 allblack의 블로그이자 포트폴리오입니다.",
    defaultLocale: "ko",
  },
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
  // GitHub Pages는 정적 호스팅이라 IPX 이미지 최적화 서버가 없으므로 원본을 그대로 서빙합니다.
  image: {
    provider: "none",
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "ko",
    locales: [
      { code: "ko", language: "ko-KR", name: "한국어", file: "ko.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      redirectOn: "root",
    },
  },
  // SPA(ssr:false)에서는 OG 이미지 생성을 사용하지 않습니다.
  ogImage: { enabled: false },
  tailwindcss: {
    config: {
      darkMode: "class",
      content: ["./features/**/*.vue"],
    },
  },
});
