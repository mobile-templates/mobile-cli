import Vue from 'vue'
import VueRouter from 'vue-router'
import childRoutes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: childRoutes
})
export default router
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0) // 跳转页面后从顶部加载
  document.title = to.meta.title // 设置页面title
  router.app.$options.store.commit('judge_token') // 判断是否有sessionStorage,防止刷新后登录状态失效
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (router.app.$options.store.state.token) { // 通过vuex获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
