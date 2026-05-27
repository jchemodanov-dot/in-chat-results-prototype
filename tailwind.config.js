/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#EEF1FF",
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F7F8FF",
          primary: "#F1F3FF",
        },
        primary: {
          DEFAULT: "#5269FF",
          dark: "#3E4FE0",
          soft: "#E9ECFF",
        },
        ink: {
          DEFAULT: "#111111",
          soft: "#686A78",
          faint: "#A0A3B5",
        },
        line: {
          soft: "#E1E5FF",
          strong: "#CCD3FF",
        },
        premium: {
          DEFAULT: "#FF8A1F",
          soft: "#FFF1E4",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        sheet: "0 10px 34px -16px rgba(42,50,120,0.16)",
        phone: "0 30px 60px -20px rgba(42,50,120,0.34), 0 8px 20px -8px rgba(42,50,120,0.18)",
        cta: "0 12px 28px -10px rgba(82,105,255,0.55)",
        lift: "0 6px 18px -8px rgba(42,50,120,0.18)",
      },
    },
  },
  plugins: [],
};
