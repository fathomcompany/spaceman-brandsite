/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    container: {
      center: true
    },
    screens: {
      tablet: '768px',
      ...screens
    },
    extend: {
      letterSpacing: {
        widest: '0.4em',
        superwide: '0.6em'
      },
      translate: {
        minus50p: '-50%',
        '50p': '-50%'
      },
      lineHeight: {
        semi: '1.15'
      },
      cursor: {
        grab: 'grab'
      },
      colors: {
        offblack: '#2e2e2e',
        grey: '#f7f7fd',
        purple: '#cc01f1',
        orange: '#fc0451',
        red: '#fe048f',
        pink: '#fe01a4',
        green: '#6cd0b3',
        lime: '#90b392'
      },
      inset: {
        m1: '-1px',
        m10vh: '-10vh',
        m20vh: '-20vh',
        m10vw: '-10vw',
        m20vw: '-20vw',
        '50p': '50%'
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        header: '51'
      },
      backgroundOpacity: {
        '35': '0.35',
        '65': '0.65'
      },
      fontSize: {
        '15xl': '1.375rem',
        '25xl': '1.75rem',
        '35xl': '2rem',
        '55xl': '3.75rem',
        '8xl': '6rem',
        xxs: '.65rem',
        xxxs: '.5rem',
        mxl: '1.4rem'
      },
      maxWidth: {
        '3-grid': '17rem',
        '3-grid-mobile': '12rem',
        logo: '100px',
        'logo-sm': '85px',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%'
      },
      minHeight: {
        sm: '8rem',
        lg: '32rem'
      },
      width: {
        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
        '30p': '30%',
        '35p': '35%',
        '40p': '40%',
        '43p': '43%',
        '45p': '45%',
        '50p': '50%',
        '55p': '55%',
        '60p': '60%',
        '65p': '65%',
        '70p': '70%',
        '75p': '75%',
        '80p': '80%',
        '85p': '85%',
        '90p': '90%',
        '95p': '95%',
        '100p': '100%',
        'half-screen': '50vw'
      },
      height: {
        '50p': '50%'
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelist: []
    }
  },
  separator: '_' // for Pug support https://tailwindcss.com/docs/configuration/#separator
}
