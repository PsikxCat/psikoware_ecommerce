import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    // container: {
    //   center: true,
    //   padding: '2rem',
    //   screens: {
    //     '2xl': '1400px'
    //   }
    // },
    extend: {
      textColor: {
        primary: 'var(--clr-primary)',
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)',
        dark: 'var(--clr-dark)',
        muted: 'var(--clr-muted)'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      borderColor: {
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)',
        dark: 'var(--clr-dark)',
        muted: 'var(--clr-muted)'
      },
      backgroundColor: {
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)',
        dark: 'var(--clr-dark)',
        muted: 'var(--clr-muted)'
      },
      maxWidth: {
        '3xl': '2000px'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
