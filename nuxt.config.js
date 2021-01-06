
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '@nuxtjs/pwa'
  ],
  // router: {
  //   middleware: 'auth'
  // },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  manifest: {
    name: 'スマレポ',
    lang: 'ja',
    short_name: 'スマレポ',
    title: 'スマレポ',
    // 'og:title': 'demo',
    description: 'スマブラ戦績分析アプリ',
    // 'og:description': 'demoサイトです',
    theme_color: '#579aff',
    background_color: '#579aff',
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
