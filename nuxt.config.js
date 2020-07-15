const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  env: {
    API_URL: process.env.API_URL,
    INDEX_GAMES: process.env.INDEX_GAMES,
    INDEX_USER: process.env.INDEX_USER,
    INDEX_STATS: process.env.INDEX_STATS
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-touch-icon.png'
      }
    ],
    script: [{ src: '/js/anthive-4.0.js', defer: true }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */

  css: [
    '~/assets/style/app.styl',
    '~/assets/style/style.css',
    '~/assets/style/fonts.css',
    '~/assets/style/global.scss',
    '~/assets/style/textures.css'
  ],

  webfontloader: {
    google: {
      families: ['Rubik:300,400,500,600&display=swap']
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '@/plugins/anthive'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    ['@nuxtjs/google-analytics', { id: 'UA-122954385-1' }],
    [
      'nuxt-i18n',
      {
        lazy: true,
        locales: [
          {
            code: 'en',
            file: 'en.json'
          },
          {
            code: 'ru',
            file: 'ru.json'
          }
        ],
        loadLanguagesAsync: true,
        langDir: 'lang/',
        defaultLocale: 'en'
      }
    ],
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://anthive.io'
  },
  markdownit: {
    preset: 'commonmark',
    linkify: true,
    breaks: true,
    hatml: true,
    langPrefix: ''
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    buildModules: [
      'nuxt-webfontloader',
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    quiet: false
  }
}
