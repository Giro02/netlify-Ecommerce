import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        montse: ["Montserrat", "sans-serif"],
        noto: ["Noto Sans TC"],
      },
    },
    colors: {
      color: {
        1: "#417B25",
        2: "#436e2cde",
        3: "rgb(255 255 255)",
        4: "rgb(229 231 235)",
        5: "#373737",
      },
    },
  },
  plugins: [],
};
export default config;
