const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e6eaff",
          200: "#c8d3ff",
          300: "#9cb3ff",
          400: "#6c8aff",
          500: "#4562f3",
          600: "#2f48d6",
          700: "#2438a8",
          800: "#1d2f85",
          900: "#1c2c6c",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
    },
  },
  plugins: [],
};
