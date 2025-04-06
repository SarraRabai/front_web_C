/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include your file types and folders
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
