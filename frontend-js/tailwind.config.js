export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-2xl": "1200px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        gray: {
          50: "#f9fafb",
          900: "#111827",
        },
      },
    },
  },
};
