const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      spacing: {
        "pagination-gap": "12px",
      },

      // 
      width: {
        "img-product": "80px",
      },
      height: {
        "img-product": "80px",
      },

      // 
      boxShadow: {
        product: "0 2px 8px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        "product": "12px",
      },
    },
  },

  darkMode: "class",

  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "8px",
          large: "12px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      themes: {
        light: {},
        dark: {},
      },
    }),
  ],
};