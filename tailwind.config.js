module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./data/**/*.{yml,yaml,json,toml}",
    "./static/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        light: "#e5e7eb",
        accent: "#22c55e",
      },
      fontFamily: {
        body: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Inter",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
  plugins: [],
};
