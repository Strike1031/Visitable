module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      stress: 'rgb(101, 45, 134)',
    }),

    extend: {
      colors: {
        'custom-blue': {
          dark: '#1c114e',
        },
        primary: {
          100: '#F7EEFC',
          200: '#EEDEFA',
          300: '#DFC9F2',
          400: '#CCB5E5',
          DEFAULT: '#68cbf6',
          600: '#8B6FB6',
          700: '#674D98',
          800: '#47307A',
          900: '#301D65',
        },
        success: {
          100: '#DDFBD3',
          200: '#B6F8A9',
          300: '#83EC7B',
          400: '#58D95B',
          DEFAULT: '#28c13a',
          600: '#1DA539',
          700: '#148A38',
          800: '#0C6F33',
          900: '#075C30',
        },
        info: {
          100: '#D1F5FE',
          200: '#A4E6FE',
          300: '#77D2FE',
          400: '#55BDFD',
          DEFAULT: '#1e9bfc',
          600: '#1578D8',
          700: '#0F5AB5',
          800: '#093F92',
          900: '#052D78',
        },
        warning: {
          100: '#FFF8CC',
          200: '#FFF099',
          300: '#FFE666',
          400: '#FFDC3F',
          DEFAULT: '#ffcb00',
          600: '#DBA900',
          700: '#B78A00',
          800: '#936C00',
          900: '#7A5700',
        },
        danger: {
          100: '#FFE8E3',
          200: '#FFCDC7',
          300: '#FFACAC',
          400: '#FF97A0',
          DEFAULT: '#FF758E',
          600: '#DB557A',
          700: '#B73A69',
          800: '#932558',
          900: '#7A164E',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
