// 权限拦截 导航守卫
import router from '../router'
router.beforeEach(function (to, from, next) {
//   alert(1)
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
