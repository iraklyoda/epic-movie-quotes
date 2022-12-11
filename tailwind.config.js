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
      xs: "280px",
      sm: "420px",
      md: "1024px",
      lg: "1280px",
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderWidth: {
        1: "1px",
      },
      lineHeight: {
        22.5: "5.625rem",
      },
      fontSize: {
        xxs: "8px",
        xs: "10px",
      },
      fontFamily: {
        helvetica: ["Helvetica Neue", "sans-serif"],
      },
      colors: {
        vermilion: "#E33812",
        fadeBlack: "rgba(0, 0, 0, 0.6)",
        fadeBlue: "rgba(13, 110, 253, 0.25)",
        fadeGrey: "rgba(239, 239, 239, 0.2)",
        fadePurple: "rgba(151, 71, 255, 0.4)",
        fadePink: "rgba(190, 9, 103, 0.01)",
        darkGreen: "#0F5132",
        validGreen: "#198754",
        fadeGreen: "rgba(25, 135, 84, 0.2)",
        searchBlue: "rgba(18, 16, 26, 0.98)",
        successGreen: "#BADBCC",
        BlueRibbon: "#0D6EFD",
        darkBlue: "#11101A",
        skinWhite: "#DDCCAA",
        niceRed: "#E31221",
        carrotOrange: "#EC9524",
        carrotOrangeFade: "rgba(236, 149, 36, 0.2)",
        footerBlue: "#181623",
        headerBlue: "#24222F",
        niceGrey: "#6C757D",
        lightGrey: "#CED4DA",
        fadeLightGray: "rgba(206, 212, 218, 0.1)",
        SteelGray: "#222030",
        RustyRed: "#DC3545",
        cinder: "#11101A",
        mirage: "#181624",
        riverStyx: "#181624",
        borderGrey: "rgba(108, 117, 125, 0.5)",
      },
      height: {
        110: "27.5rem",
        130: "35rem",
        176: "44rem",
        300: "75rem",
      },
      maxHeight: {
        150: '37.5rem',
        176: "52rem",
      },
      width: {
        15: "3.75rem",
        110: "27.5rem",
        150: "37.5rem",
        176: "44rem",
        200: "50rem",
        225: "56.25rem",
        240: "60rem",
        245: "61.25rem",
      },
      margin: {
        160: "40rem",
      },
      blur: {
        xs: "2px",
      },
      backgroundImage: {
        blueGradient:
          "linear-gradient(131deg, rgba(32,29,47,1) 20%, rgba(46,42,69,0.5186449579831933) 100%)",
        mirageGradient:
          "linear-gradient(90deg, rgba(24,22,35,1) 0.07%, rgba(25,23,37,1) 50.6%, rgba(13,11,20,1) 96.88%)",
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
