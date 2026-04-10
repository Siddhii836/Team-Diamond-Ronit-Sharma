import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        'app-dark': '#0F172A',
        'card-dark': '#1E293B'
      }
    }
  },
  plugins: []
} satisfies Config;
