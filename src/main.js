// Import Vue and the main App component
import Vue from 'vue'
import App from './App.vue'

// Import the router and Vuex store
import router from './router'
import store from './store/store'

// Import the main CSS file for styling
import './assets/main.css'

// Import BootstrapVue and IconsPlugin from Bootstrap-Vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Create a new Vue instance with the router, store, and the main App component
new Vue({
  router,
  render: (h) => h(App),
  store
}).$mount('#app')
