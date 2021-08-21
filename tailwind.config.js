module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primaryBg: "#010409",
      secondaryBg: "#0D1117",
      alternateText: "#2EA043",
      secondaryText:"#DBDBDC",
      primaryText: "#ffffff"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
