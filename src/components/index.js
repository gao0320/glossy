// Vue.use全局注册组件
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', BreadCrumb)
  }
}
