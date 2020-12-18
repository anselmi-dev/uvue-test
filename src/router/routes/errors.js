const routes = [
  {
    path: '/error',
    name: 'Error',
    meta: { bodyClass: 'punku-page-center' },
    component: () => import('@/views/About.vue')
  },
  {
  	path: '/404',
  	name: '404',
    meta: { bodyClass: 'punku-page-center' },
  	component: () => import('@/views/404.vue')
  },
  { path: '*', redirect: '/404' },
]

export default routes
