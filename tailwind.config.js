/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./dist/index.html",
    "./dist/*",
    "./dist/*.*",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        xs: "0.75rem", // Extra small
        sm: "0.875rem", // Small
        base: "1rem", // Base
        lg: "1.125rem", // Large
        xl: "1.25rem", // Extra large
        "2xl": "1.5rem", // 2x large
        "3xl": "1.875rem", // 3x large
        "4xl": "2.25rem", // 4x large
        "5xl": "3rem", // 5x large
        "6xl": "4rem", // 6x large
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
  mode: "jit",
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
