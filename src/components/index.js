// Vue.use全局注册组件
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
  }
}
