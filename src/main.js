import Vue from 'vue'
import './plugins/vuetify'
import './plugins/firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$http = axios
Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
