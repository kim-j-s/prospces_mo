module.exports = {
  mode: 'jit', // Just-In-Time Compiler
  purge: ['./src/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    colors: {
      gray: {
        darkest: '#1f2d3d',
        dark: '#3c4858',
        DEFAULT: '#757575',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
    },
    fontFamily: {
      sans: ['Spoqa Han Sans Neo', 'sans-serif'],
      eng: ['Poppins', 'sans-serif'],
    },
    extend: {
      spacing: {
        gutter: '1.25rem',
      },
      colors: {
        psred: '#D13B40',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}