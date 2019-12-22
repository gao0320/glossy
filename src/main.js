import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import './utils/request'// 引入自己封装的axios
import Component from './components'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
