import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  purge: {
    content: [
      "./components/**/*.{vue}",
      "./pages/**/*.{vue}",
      "./features/**/*.{vue}",
    ],
  },
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f3f4f6",
      },
    },

    colors: {
      primary: "#f3f4f6",
      secondary: "#f3f4f6",
      tertiary: "#f3f4f6",
      quaternary: "#f3f4f6",
      quinary: "#f3f4f6",
      senary: "#f3f4f6",
      septenary: "#f3f4f6",
      octonary: "#f3f4f6",
      nonary: "#f3f4f6",
      denary: "#f3f4f6",
    },
  },
  plugins: [],
};
