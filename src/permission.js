import router from '@/router'
import store from '@/store'
// 路由(全局)守卫
// 会在所有路由进入之前触发
// to:去哪里的路由信息
// from: 来自那个路由接口
// next:跳转到指定路由，没有调用无法进入
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    store.dispatch('user/gituserInfo')
    // 登录
    // 是否进入登录页
    if (to.path === '/login') {
      // 1.1 是 跳转到首页
      next('/')
    } else {
      // 1.2 不是直接进入
      next()
    }
  } else {
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      // 2.1 在白名单 方行
      next()
    } else {
      // 2.2 不在 去登录
      next('/login')
    }
  }
})
