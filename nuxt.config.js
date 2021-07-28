export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '｜第62回聖光祭公式サイト',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
    
  },

  scrollToTop: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/typekit.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
 modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAoYxCjDpPYPA3eMwcHoQDCYoAiS1CF2V4",
          authDomain: "seikofes62ndwebsite.firebaseapp.com",
          projectId: "seikofes62ndwebsite",
          storageBucket: "seikofes62ndwebsite.appspot.com",
          messagingSenderId: "2816752655",
          appId: "1:2816752655:web:282fcac0e22718a0c7777a",
          measurementId: "G-KETHWYCYN5"
        },
        services: {
          firestore: true,
          storage: true,
          hosting: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.scss$/,
        loader: 'vue-style-loader!css-loader!sass-loader'
      })
    }
  }
}
