/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      16: "4rem",
    },
    screens: {
      sm: "640px",
      md: "1024px",
      lg: "1280px",
    },
    extend: {
      lineHeight: {
        22.5: "5.625rem",
      },
      fontSize: {
        xxs: "8px",
      },
      fontFamily: {
        helvetica: ["Helvetica Neue", "sans-serif"],
      },
      colors: {
        fadeBlack: "rgba(0, 0, 0, 0.6)",
        BlueRibbon: "#0D6EFD",
        darkBlue: "#11101A",
        skinWhite: "#DDCCAA",
        niceRed: "#E31221",
        footerBlue: "#181623",
        niceGrey: "#6C757D",
        lightGrey: "#CED4DA",
        SteelGray: "#222030",
        RustyRed: "#DC3545",
      },
      height: {
        110: "27.5rem",
        176: "44rem",
        300: "75rem",
      },
      width: {
        150: "37.5rem",
        176: "44rem",
        245: "61.25rem",
      },
      margin: {
        160: "40rem",
      },
      backgroundImage: {
        interstellar:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('@/assets/images/landing_movies/interstellar.png')",
        lotr: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('@/assets/images/landing_movies/lotr.png')",
        royal:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('@/assets/images/landing_movies/royal.png')",
      },
    },
  },
  plugins: [],
};
