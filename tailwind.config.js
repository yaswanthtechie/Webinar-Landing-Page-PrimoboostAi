/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--color-background)",
          foreground: "var(--color-foreground)",
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
          muted: "var(--color-muted)",
          destructive: "var(--color-destructive)",
        },
        fontFamily: {
          sans: ["var(--font-sans)"],
          heading: ["var(--font-heading)"],
        },
      },
    },
    plugins: [],
  };
  