/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFBF0',
          100: '#FFF3D0',
          200: '#FFEDA1',
          300: '#FFE672',
          400: '#FFDE43',
          500: '#FFD700',
          600: '#D4AF37',
          700: '#AA8C2E',
          800: '#806A25',
          900: '#55481C',
        },
        dark: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      backgroundColor: {
        primary: '#111827',
        secondary: '#1F2937',
        accent: '#D4AF37',
      },
      textColor: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB',
        accent: '#D4AF37',
      },
      borderColor: {
        primary: '#374151',
        accent: '#D4AF37',
      },
    },
  },
  plugins: [],
}
