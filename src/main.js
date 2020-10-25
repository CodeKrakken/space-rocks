import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import { auth } from './firebase'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
