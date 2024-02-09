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
        1: "#73925B",
        2: "#36452B",
        3: "#ffffff",
        4: "#e5e7eb",
        5: "#373737",
      },
    },
  },
  plugins: [],
};
export default config;
