/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom, rgb(8, 116, 206), rgb(69, 171, 222))",
      },
    },
  },
  plugins: [],
};
