
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'スマレポ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase',
    '~/plugins/cookie',
    '~/plugins/setup',
    {
      src: '~/plugins/ga.js',
      mode: 'client'
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-adsense', {
      id: process.env.GA_ADSENSE_ID,
      pageLevelAds: true,
      // analyticsUacct: process.env.GA_TRACKING_ID, // アナリティクスと連携する場合のみ必要
      // analyticsDomainName: domain                 // アナリティクスと連携する場合のみ必要
    }]
  ],
  router: {
    middleware: 'version'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  manifest: {
    name: 'スマレポ',
    lang: 'ja',
    short_name: 'スマレポ',
    title: 'スマレポ',
    'og:title': 'スマレポ',
    description: 'スマブラ戦績分析アプリ',
    'og:description': 'スマブラ戦績分析アプリ',
    theme_color: '#579aff',
    background_color: '#ffffff',
    display: "standalone",
    scope: "/",
    start_url: "/",
    icon: {
      iconFileName: 'static/icon.png',
      type: 'image/png',
      sizes: '512x512'
    }
  },
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
