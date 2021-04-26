import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'

// 全局css
import '@/assets/style/reset.css'
import '@/assets/style/common.css'
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
Vue.use(plugins)
window.WEBOTS = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
