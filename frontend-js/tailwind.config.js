export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //  Custom Breakpoints for responsive design
      screens: {
        xs: "400px", // Small mobile devices
        sm: "576px", // Mobile phones
        md: "768px", // Tablets
        lg: "992px", // Laptops
        xl: "1200px", // Desktops
        "2xl": "1400px", // Large desktops
      },
      // card
      spacing: {
        "card-mobile": "300px", //  W mobile
        "card-height": "180px", //  H mobile
      },

      //  Responsive max-width settings
      maxWidth: {
        "screen-2xl": "1400px", // Maximum content width
        "card-sm": "300px", // Card size for mobile
        "card-md": "400px", // Card size for tablets
        "card-lg": "500px", // Card size for desktops
      },

      //  Responsive font settings
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Primary font stack
      },

      //  Custom color palette
      colors: {
        gray: {
          50: "#f9fafb", // Light gray
          900: "#111827", // Dark gray
        },
        primary: {
          light: "#f0f9ff", // Light mode primary
          dark: "#0369a1", // Dark mode primary
        },
      },

      //  Custom animations for cards
      animation: {
        flip: "flip 0.5s ease-in-out", // Card flip animation
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(0)" }, // Start position
          "100%": { transform: "rotateY(180deg)" }, // End position
        },
      },

      //  Responsive shadow effects
      boxShadow: {
        "card-sm": "0 2px 4px rgba(0,0,0,0.1)", // Mobile shadow
        "card-md": "0 4px 8px rgba(0,0,0,0.1)", // Tablet shadow
        "card-lg": "0 8px 16px rgba(0,0,0,0.1)", // Desktop shadow
        flashcard:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },

  //  Dark mode configuration (class-based)
  darkMode: "class",

  //  Additional Tailwind plugins
  plugins: [
    require("@tailwindcss/forms"), // Better form styling
    require("@tailwindcss/typography"), // Prose content styling
  ],
};
