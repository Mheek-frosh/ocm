/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        optima: {
          bg: '#060B14',
          primary: '#0A84FF',
          secondary: '#2D9CFF',
          text: '#F8FAFC',
          muted: '#94A3B8',
          border: 'rgba(255,255,255,0.08)',
          card: 'rgba(255,255,255,0.03)',
          glow: 'rgba(10,132,255,0.35)',
        },
      },
      boxShadow: {
        optima: '0 0 40px rgba(10,132,255,0.18)',
      },
    },
  },
  plugins: [],
};
