export default [
  {
    path: '/header',
    name: 'header',
    component: () => import('@/views/Headers.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false, bodyClass: 'punku-page-center' },
    component: () => import('@/views/auth/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { requiresAuth: false, bodyClass: 'punku-page-center' },
    component: () => import('@/views/auth/register.vue')
  },
  {
    path: '/restore-password/:code',
    name: 'restore.password',
    meta: { requiresAuth: false, bodyClass: 'punku-page-center' },
    component: () => import('@/views/auth/Restore.vue')
  },
  {
    path: '/register/success',
    name: 'register.success',
    meta: { requiresAuth: true, bodyClass: 'punku-page-center' },
    component: () => import('@/views/auth/RegisterSuccess.vue')
  },
  {
    path: '/verify-account/:code',
    name: 'verify-account',
    meta: { requiresAuth: false, bodyClass: 'punku-page-center' },
    component: () => import('@/views/auth/VerifyAccount.vue'),
  },
  {
    path: '/account-verified',
    name: 'account-verified',
    meta: { requiresAuth: true, bodyClass: 'punku-page-center' },
    component: () => import('@/views/auth/accountVerified.vue')
  }
]
