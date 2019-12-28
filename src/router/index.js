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
  // 主页路由
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
    component: () => import('../views/comment')// 按需加载
  },
  { path: 'material',
    component: () => import('../views/material')
  },
  {
    path: 'articles',
    component: () => import('../views/articles')
  }, {
    path: 'publish/:articleId', // 定义动态路由参数 此规则值匹配修改文章
    component: () => import('../views/publish')
  }, {
    path: 'publish', // 此规则只匹配发布文章
    component: () => import('../views/publish')
  }, {
    path: 'account',
    component: () => import('../views/account')
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
