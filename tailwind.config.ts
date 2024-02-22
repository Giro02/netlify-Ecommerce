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
<<<<<<< HEAD
      padding:'2rem',
=======
>>>>>>> 07982dd77c73355573398d337aee262bc009f713
    },
    extend: {
      aspectRatio: {
        "4.47/1": "4.47/1",
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
        1: "#73925B",
        2: "#36452B",
        3: "#ffffff",
        4: "#e5e7eb",
        5: "#373737",
        6: "#fae0a7",
        7: "#B75454",
      },
    },
  },
  plugins: [],
};
export default config;
