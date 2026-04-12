/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E8633A',
          'primary-light': '#FDEEE8',
          'primary-dark': '#C44D26',
          secondary: '#F9C846',
          'secondary-light': '#FEF6D8',
          accent: '#3ABDE8',
          'accent-light': '#E0F5FD',
          bg: '#FFFBF7',
          surface: '#FFF5EE',
          text: '#1E1A16',
          muted: '#7A6B61',
          border: '#EDD9CC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 4px 24px rgba(232, 99, 58, 0.12)',
        'warm-lg': '0 8px 40px rgba(232, 99, 58, 0.18)',
        card: '0 2px 16px rgba(30, 26, 22, 0.08)',
        'card-hover': '0 8px 32px rgba(30, 26, 22, 0.14)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
