const serverURL = process.env.SERVER_URL || 'http://localhost:8000'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'make day',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'icon.png' }],
    script: [
      {
        type: 'text/javascript',
        src: 'https://kit.fontawesome.com/0ad7ed00eb.js',
        crossorigin: 'anonymous',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/fonts/main.css', '~/assets/styles/main.scss'],

  styleResources: {
    scss: [
      '~/assets/styles/_colors.scss', // use underscore "_" & also file extension ".scss"
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lottie-vue-player.client.js',
    { src: '~/plugins/dompurify.js', mode: 'client' },
    { src: '~/plugins/globals.js' },
    { src: '~/plugins/infiniteloading', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: serverURL + '/api',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    serverUrl: process.env.SERVER_URL || 'http://localhost:8000',
  },

  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    language: 'ko', // Recaptcha language (v2)
    siteKey: '6Ld18jUfAAAAAADRlQdpYwK2c-RioAH3lDVpT2_t',
    version: 2, // Version
  },
}
