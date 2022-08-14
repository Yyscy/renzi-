import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id', // 二级路由path什么都不写 表示二级默认路由
      component: () => import('@/views/employees/detail.vue'),
      hidden: true // 隐藏在左侧菜单中
    }
  ]
}
