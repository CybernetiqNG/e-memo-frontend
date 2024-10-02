/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        primary: "#E7FFF7",
        secondary: "#0E9F6E",
        tertiary: "#025C00",
        grey: "#2E2E2E80",
        btn: "#023D00",
        ash: "#F6F6F6",
      },
      boxShadow: {
        "custom-shadow": "0px 4px 42px 0px #0000001A",
        "custom-sm": "0px 3px 16.26px 0px #00000014",
      },
    },
  },
  plugins: [],
};
