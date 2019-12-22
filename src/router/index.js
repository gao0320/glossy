import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/home'
},
{
  // 主页
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    path: '', // 二级路由不写作为显示组件
    component: Home2
  },
  {
  // 二级路由表
    path: 'comment',
    component: () => import('../views/comment')
  }]
}, {
  path: '/login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
