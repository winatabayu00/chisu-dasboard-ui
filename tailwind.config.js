/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
    "./node_modules/flowbite/**/*.js",
      flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ]
}
