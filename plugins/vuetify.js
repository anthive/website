// import colors from 'vuetify/es5/util/colors'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      themes: {
        light: {
          primary: '#4c377f',
          accent: '#9a64ff',
          danger: '#e03e2f',
          success: '#6c5fc7',
          action: '#d12104'
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
