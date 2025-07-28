// File: frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refined teen-friendly color palette - fewer but more sophisticated
        primary: {
          yellow: '#FFC107',     // Bright energetic yellow - main brand color
          'yellow-light': '#FFD54F',
          'yellow-dark': '#FF8F00',
        },
        secondary: {
          blue: '#2196F3',       // Clean modern blue
          'blue-light': '#64B5F6',
          'blue-dark': '#1976D2',
        },
        accent: {
          red: '#FF5722',        // Vibrant but not aggressive red
          'red-light': '#FF7043',
          'red-dark': '#D84315',
        },
        neutral: {
          pink: '#E91E63',       // Sophisticated pink
          'pink-light': '#F48FB1',
          'pink-dark': '#C2185B',
        },
        support: {
          purple: '#9C27B0',     // Rich purple for highlights
          'purple-light': '#BA68C8',
          'purple-dark': '#7B1FA2',
        },
        // Keep essential grays and whites
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      },
      fontFamily: {
        // Playful fonts perfect for teens - back to original!
        'display': ['Fredoka', 'Comfortaa', 'system-ui', 'sans-serif'],
        'heading': ['Nunito', 'Fredoka', 'system-ui', 'sans-serif'],
        'body': ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        'fun': ['Bubblegum Sans', 'Fredoka', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'slide-down': 'slideDown 0.3s ease-out',
        'pop-in': 'popIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 193, 7, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 193, 7, 0.8)' }
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
      }
    },
  },
  plugins: [],
}