// 导出该模块路由
export default [{
  path: '/',
  name: 'index',
  component: () => import('../view/index'),
  meta: {
    title: '首页',
    requireAuth: true
  }
}, {
  path: '/index',
  name: 'index',
  component: () => import('../view/index'),
  meta: {
    title: '首页',
    requireAuth: true
  }
}, {
  name: 'login',
  path: '/login',
  component: () => import('../view/login.vue'),
  meta: {
    title: '登录',
    requireAuth: false
  }
}, {
  name: 'studentCenter',
  path: '/studentCenter',
  component: () => import('../view/myCenter/studentCenter.vue'),
  meta: {
    title: '个人中心',
    requireAuth: false
  }
}
]
