/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        chrome: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#BDBDBD', // Text Highlight
          400: '#9ca3af',
          500: '#6b7280',
          600: '#585858', // Mid Gray (Border/Accent)
          700: '#374151',
          800: '#2C2C2C', // Card Background
          900: '#1f2937',
          950: '#0a0a0a', // Global Background
        },
        glass: {
          100: 'rgba(255, 255, 255, 0.05)',
          200: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(10, 10, 10, 0.6)',
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        neon: '0 0 10px rgba(189, 189, 189, 0.3), 0 0 20px rgba(189, 189, 189, 0.1)', // Silver glow
      },
      backgroundImage: {
        'chrome-gradient': 'linear-gradient(to right, #0a0a0a, #2C2C2C, #0a0a0a)',
      }
    },
  },
  plugins: [],
}