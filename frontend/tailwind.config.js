// File: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // EXACT MATCH to HomePage - MAGAZINE POWER FONTS
        'display': ['Playfair Display', 'serif'],    // MASSIVE impact headlines
        'body': ['Inter', 'sans-serif'],             // Clean, readable body text
        'accent': ['Space Grotesk', 'sans-serif'],   // Bold, modern impact text
        
        // Default sans fallback
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // EXACT HOMEPAGE COLORS - MATCHING REAL STYLING
      colors: {
        'brand': {
          red: '#DC2626',      // Main red (matches HomePage)
          purple: '#7C3AED',   // Deep purple 
          blue: '#1E40AF',     // Strong blue
          green: '#059669',    // Fresh green
          yellow: '#D97706',   // Bold yellow
          pink: '#DB2777'      // Vibrant pink
        }
      },
      
      // Custom animations for playful interactions
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      
      // Custom spacing for better design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}