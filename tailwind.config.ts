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
      padding: '2rem'
    },
    extend: {
      aspectRatio: {
        "4.47/1": "4.47/1",
        "1.16/1":"1.16/1",
        "0.96/1":"0.96/1"
      },
      fontFamily: {
        montse: ["Montserrat", "sans-serif"],
        noto: ["Noto Sans TC"],
      },
      animation: {
        "spin-slower": "spin 2s linear infinite",
      
      },
    },
    colors: {
      color: {
        1: "#076AA2",
        2: "#022f57",
        3: "#ffffff",
        4: "#DBDBDB",
        5: "#373737",
        6: "#fae0a7",
        7: "#B75454",
      },
    },
  },
  plugins: [],
};
export default config;
