/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orbit: {
          bg: "#080D1A",
          bgSub: "#0B111E",
          surface: "#0E1729",
          card: "#131B2E",
          cardHover: "#18233C",
          border: "#1F2E4D",
          borderLight: "#2E4573",
          borderActive: "#3B82F6",
          cobalt: "#2563EB",
          cobaltHover: "#1D4ED8",
          cobaltLight: "#3B82F6",
          bone: "#F8FAFC",
          slate: "#94A3B8",
          slateDark: "#64748B",
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'cobalt-sm': '0 2px 10px rgba(37, 99, 235, 0.2)',
        'cobalt-btn': '0 4px 14px rgba(37, 99, 235, 0.35)',
        'card-subtle': '0 4px 20px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
