/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gemini-blue': '#8AB4F8',
        'gemini-gray': {
          DEFAULT: '#303134',
          light: '#f8f9fa',
        },
        'gemini-dark': {
          DEFAULT: '#202124',
          light: '#ffffff',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            a: {
              color: '#8AB4F8',
              '&:hover': {
                color: '#a8c6fa',
              },
            },
            code: {
              color: 'inherit',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}