import { resolve } from 'path'
import routes from './build/routes'

// Determine if the system is generating the static build
const isGenerating = process.env.npm_lifecycle_event === 'generate'

export default {
  mode: process.env.NUXT_MODE || 'universal',

  target: 'static',

  env: {
    NUXT_MODE: process.env.NUXT_MODE,
    BASE_URL: process.env.BASE_URL
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'SPACEMAN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'We are a media agency that makes motion content with irresistible gravity.'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'SPACEMAN'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/app.styl',
    // Vendor CSS
    'vue-visual/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-globals',
    '~/plugins/vue-globals.client',

    '~/plugins/polyfills.client',
    '~/plugins/webp.client',
    '~/plugins/window-events.client',
    '~/plugins/image-utils'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',

    [
      'nuxt-stylus-resources-loader',
      resolve(__dirname, 'assets/definitions.styl')
    ],

    // https://github.com/BKWLD/bukwild-contentful-utils
    [
      'bukwild-contentful-utils/nuxt/module',
      {
        config: {
          space: process.env.CONTENTFUL_SPACE,
          access_token: process.env.CONTENTFUL_API,
          host: process.env.CONTENTFUL_HOST
        }
      }
    ],

    // Load SVGs from assets folder
    '@nuxtjs/svg',

    // Create Netlify redirects dynamically
    '~/build/redirects'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    routes: isGenerating ? routes.forGenerate : null,
    fallback: process.env.NUXT_MODE === 'spa'
  },

  /**
   * PWA Meta config
   * See: https://pwa.nuxtjs.org/modules/meta.html#options
   */
  pwa: {
    meta: {
      name: 'SPACEMAN',
      description:
        'We are a media agency that makes motion content with irresistible gravity.',
      author: 'SPACEMAN Media'
    }
  },

  // Google Analytics module config
  googleAnalytics: {
    // Staging and prod use a single ID
    id: 'UA-179207567-1'
    // Toggle off to stop firing in dev mode
    // debug: {
    //   enabled: true,
    //   sendHitTask: true
    // }
  }
}
