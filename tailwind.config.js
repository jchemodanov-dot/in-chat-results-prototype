/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#EEF1FF",
        surface: "#FFFFFF",
        "surface-muted": "#F7F7FF",
        primary: "#5269FF",
        "primary-dark": "#3E4FE0",
        "text-primary": "#111111",
        "text-secondary": "#6B6B7A",
        border: "#E2E5FF",
        premium: "#FF8A1F",
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
        sheet: "0 8px 30px -12px rgba(40,50,90,0.16)",
        phone: "0 30px 60px -20px rgba(40,50,90,0.35), 0 8px 20px -8px rgba(40,50,90,0.18)",
        cta: "0 10px 24px -10px rgba(82,105,255,0.55)",
      },
    },
  },
  plugins: [],
};
