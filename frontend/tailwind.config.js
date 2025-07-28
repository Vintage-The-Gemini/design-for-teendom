/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Teen-friendly vibrant colors (no gradients, solid colors)
        'teen-yellow': '#FFD54F',      // Bright sunny yellow
        'teen-blue': '#42A5F5',        // Cheerful blue
        'teen-pink': '#F06292',        // Playful pink
        'teen-orange': '#FF7043',      // Energetic orange
        'teen-purple': '#AB47BC',      // Fun purple
        'teen-green': '#66BB6A',       // Fresh green
        'teen-red': '#EF5350',         // Vibrant red
        'teen-teal': '#26C6DA',        // Bright teal
        'teen-lime': '#9CCC65',        // Zesty lime
        'teen-indigo': '#7E57C2',      // Deep indigo
        'teen-cyan': '#29B6F6',        // Electric cyan
        'teen-amber': '#FFCA28',       // Warm amber
      },
      fontFamily: {
        // Playful fonts perfect for teens
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
        'rainbow': 'rainbow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        rainbow: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-1deg)' }
        }
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
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