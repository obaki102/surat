/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';


export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts}",],
  theme: {
    extend: {
      animation: {
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .8s 1 normal both',
        'type-reverse': 'type 1.8s ease-out 0s infinite alternate-reverse both',
      },
      fontFamily: {
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'sm': '0.775rem',

      },
      colors: {
        black: {
          default: '#1E1E1E',
          lighter: '#161B22',
          dark: '#0D1117',
        },
        'surat': {
          100: '#e6e6e6',
          300: '#393937',
          400: '#32312F',
          500: '#212121', 
          900: '#171717', 
        }
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-bullets': theme('colors.gray.800'),
          },
        },
      }),
      keyframes: {
        type: {
          '0%': { width: '0ch' },
          '5%, 10%': { width: '1ch' },
          '15%, 20%': { width: '2ch' },
          '25%, 30%': { width: '3ch' },
          '35%, 40%': { width: '4ch' },
          '45%, 50%': { width: '5ch' },
          '55%, 60%': { width: '6ch' },
          '65%, 70%': { width: '7ch' },
          '75%, 80%': { width: '8ch' },
          '85%, 90%': { width: '9ch' },
          '95%': { width: '10ch' },
        }
      },
      width: {
        '720': '720px',
      },
      maxWidth: {
        '720': '720px',
      },
    },
    screens: {
      'sm': '700px',
      // => @media (min-width: 700px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '3440px',
      // => @media (min-width: 3440px) { ... }
    },
    container: {
      center: true,
    },
  },
  darkMode: 'class',
  plugins: [typography],
}




