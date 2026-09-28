/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0c0d0e',
          light: '#f8f8f9',
          offwhite: '#f5f5f7',
          purewhite: '#ffffff',
          charcoal: '#18191b',
          muted: '#767676',
          border: 'rgba(0, 0, 0, 0.08)',
          subtle: '#ebecee',
          accent: '#1d3557',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        display: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widestEditorial: '0.25em',
        extreme: '0.35em',
      }
    },
  },
  plugins: [],
}
