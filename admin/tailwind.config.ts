import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "oklch(0.72 0.15 130)",
          dark: "oklch(0.55 0.15 130)",
          light: "oklch(0.88 0.08 130)",
          foreground: "oklch(0.18 0.04 130)",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "oklch(0.97 0.02 130)",
          border: "oklch(0.88 0.05 130)",
        },
        sidebar: {
          DEFAULT: "oklch(0.22 0.04 130)",
          hover: "oklch(0.28 0.06 130)",
          active: "oklch(0.72 0.15 130)",
          text: "oklch(0.92 0.03 130)",
          muted: "oklch(0.65 0.05 130)",
        },
        status: {
          pending: "#f59e0b",
          accepted: "#3b82f6",
          completed: "#22c55e",
          cancelled: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
