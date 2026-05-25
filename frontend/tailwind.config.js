/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B3A5C',
        'primary-light': '#e8eef5',
        'primary-mid': '#2d5480',
        accent: '#E8B4B8',
        'accent-light': '#fdf5f5',
        'accent-dark': '#b8737a',
        background: '#F9F8F7',
        dark: '#0D1F33',
        'text-mid': '#4a5a6b',
        'text-light': '#8a9bb0',
        surface: '#FFFFFF',
      },
      fontFamily: {
        lora: ['Lora', 'Georgia', 'serif'],
        'dm-sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        
      },
      animation: {
        morph: 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        morph: {
          '0%, 100%': {
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          },
          '50%': {
            borderRadius: '40% 60% 30% 70% / 60% 40% 55% 45%',
          },
        },
      },
    },
  },
  plugins: [],
}