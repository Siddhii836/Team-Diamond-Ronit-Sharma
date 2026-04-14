import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E8B57',
        success: '#3cb371',
        danger: '#f28b82',
        warning: '#F59E0B',
        'app-dark': '#202124',
        'card-dark': '#292a2d'
      }
    }
  },
  plugins: []
} satisfies Config;
