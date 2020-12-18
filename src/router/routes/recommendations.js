export default [
  {
    path: '/recomendaciones/:slug',
    name: 'recommendations.request',
    meta: { requiresAuth: true },
    component: () => import('@/views/recommendations/Request.vue')
  },
  {
    path: '/recomendaciones/:slug/success',
    name: 'recommendations.request.success',
    meta: { requiresAuth: true },
    component: () => import('@/views/recommendations/Success.vue')
  },
  {
    path: '/recomendaciones/confirmacion/:slug',
    name: 'recommendations.request.confirmation',
    meta: { requiresAuth: true, isTeacher: true },
    component: () => import('@/views/recommendations/Confirmation.vue')
  }
]
