/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0d0f1c', 2: '#3b3f57', 3: '#6b7090', 4: '#9aa0bd' },
        paper: { DEFAULT: '#f7f7fc', 2: '#eef0fb', 3: '#e3e6f6' },
        iris: { DEFAULT: '#5b5bf0', 50: '#f0f0ff', 100: '#e4e4ff', 200: '#cbcbff', 400: '#8a8af7', 600: '#4747d6', 700: '#3838b0' },
        violet: { DEFAULT: '#8b5cf6' },
        aqua: { DEFAULT: '#22d3ee' },
        blush: { DEFAULT: '#f472b6' },
        mint: { DEFAULT: '#34d399' },
        night: { DEFAULT: '#080a14', 2: '#0f1224', 3: '#171b34' },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(13,15,28,.04), 0 8px 24px -8px rgba(13,15,28,.10)',
        lift: '0 2px 4px rgba(13,15,28,.05), 0 24px 60px -20px rgba(70,70,160,.35)',
        glow: '0 0 0 1px rgba(91,91,240,.25), 0 20px 80px -10px rgba(91,91,240,.45)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseRing: { '0%': { transform: 'scale(.9)', opacity: '.7' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        fadeIn: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
        push: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.07)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: { float: 'float 7s ease-in-out infinite', pulseRing: 'pulseRing 2.4s ease-out infinite', marquee: 'marquee 40s linear infinite', shimmer: 'shimmer 6s linear infinite', push: 'push 14s ease-in-out infinite alternate' },
    },
  },
  plugins: [],
};
