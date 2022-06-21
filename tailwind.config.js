module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  "files.associations": {
    "*.css": "tailwindcss",
  },
  "editor.quickSuggestions": {
    strings: true,
  },

  "tailwindCSS.includeLanguages": {
    plaintext: "html",
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
