// import colors from 'vuetify/es5/util/colors'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      themes: {
        light: {
          primary: '#362d59',
          accent: '#e1567c'
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
