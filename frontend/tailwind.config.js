/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          red: '#DC2626',
          purple: '#7C3AED', 
          blue: '#1E40AF',
          green: '#059669',
          yellow: '#D97706',
          pink: '#DB2777'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Space Grotesk', 'sans-serif']
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1' }]
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    },
  },
  plugins: [],
}