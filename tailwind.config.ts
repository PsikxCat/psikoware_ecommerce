import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      textColor: {
        primary: 'var(--clr-primary)',
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)',
        dark: 'var(--clr-dark)',
        muted: 'var(--clr-muted)'
      },
      colors: {
        sushi: {
          50: '#f6f8ed',
          100: '#eaf0d7',
          200: '#d6e2b4',
          300: '#bbcf87',
          400: '#9fba61',
          500: '#829f43',
          600: '#657e32',
          700: '#4d612a',
          800: '#404e26',
          900: '#374324',
          950: '#1c240f',
          DEFAULT: '#829f43'
        }
      },
      borderColor: {
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)'
      },
      backgroundColor: {
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)',
        dark: 'var(--clr-dark)'
      },
      maxWidth: {
        '3xl': '2000px'
      }
    }
  },
  plugins: []
}
export default config
