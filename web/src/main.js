import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.css'
import './config/bootstrap'
import './config/axios'
import './config/alert'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
