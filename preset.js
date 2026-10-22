const path = require("path");

/**
 * Tailwind preset for camilaescudero.cl and its tools.
 * Color utilities read the CSS variables shipped in @camib0b/ui/ui.css.
 * The spacing scale is Tailwind's default. The only spacing override is
 * the centered container, padded 2rem, capped at 1400px.
 */
const preset = {
  darkMode: ["class"],
  content: [path.join(__dirname, "dist", "**", "*.js")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.35rem" }],
        base: ["0.95rem", { lineHeight: "1.6rem" }],
        lg: ["1.05rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.9rem" }],
        "2xl": ["1.5rem", { lineHeight: "2.1rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.2rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.55rem" }],
        "5xl": ["3rem", { lineHeight: "3.15rem" }],
      },

      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        series: {
          portfolio: "hsl(var(--series-portfolio) / <alpha-value>)",
          benchmark: "hsl(var(--series-benchmark) / <alpha-value>)",
        },
        "number-positive": "hsl(var(--number-positive) / <alpha-value>)",
        "number-negative": "hsl(var(--number-negative) / <alpha-value>)",
        "accent-teal": "hsl(var(--accent-teal) / <alpha-value>)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        "elev-2": "var(--shadow-elev-2)",
        "elev-3": "var(--shadow-elev-3)",
      },

      transitionDuration: {
        press: "var(--duration-press)",
        button: "var(--duration-button)",
        row: "var(--duration-row)",
        drop: "var(--duration-drop)",
      },

      transitionTimingFunction: {
        "out-strong": "var(--ease-out-strong)",
        color: "var(--color-ease)",
      },

      keyframes: {
        "analytics-rise": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "portfolio-sync-sweep": {
          from: { transform: "translateX(-120%)" },
          to: { transform: "translateX(320%)" },
        },
        "portfolio-skeleton-pulse": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "contribution-flag": {
          from: {
            opacity: "0",
            transform: "translateY(var(--wave-offset, 0px)) scale(0.97)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "curtain-fall": {
          from: {
            opacity: "0",
            transform: "translateY(var(--curtain-offset))",
            clipPath: "inset(0 0 100% 0)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
            clipPath: "inset(-12px)",
          },
        },
        "row-drop": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "none" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-out": {
          to: { opacity: "0", visibility: "hidden" },
        },
        "attention-pulse": {
          "0%, 100%": { color: "hsl(var(--muted-foreground))" },
          "50%": { color: "hsl(var(--accent-teal))" },
        },
      },

      animation: {
        "analytics-rise": "analytics-rise 250ms ease",
        "portfolio-sync-sweep": "portfolio-sync-sweep 1.6s ease-in-out infinite",
        "portfolio-skeleton-pulse": "portfolio-skeleton-pulse 1.8s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s var(--ease-hero) forwards",
        "contribution-flag":
          "contribution-flag var(--contribution-column-duration, 400ms) var(--ease-hero) both",
        "curtain-fall": "curtain-fall var(--curtain-duration) var(--ease-hero) both",
        "row-drop": "row-drop var(--duration-drop) var(--ease-out-strong) both",
        "toast-in": "toast-in var(--duration-drop) var(--ease-out-strong) both",
        "toast-out": "toast-out var(--duration-row) var(--color-ease) forwards",
      },
    },
  },
};

module.exports = preset;
