/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  resolve: {
    extensions: [".js", ".jsx", ".json"], // Ajoute le support des extensions
  },
};
