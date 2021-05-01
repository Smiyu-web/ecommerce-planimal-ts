module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#646464",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "hero-img": "url('/src/assets/img/planimal-top.jpeg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
