const routes = [
  {
    path: '/anuncio/nuevo',
    name: 'gig.create',
    meta: { requiresAuth: true, isTeacher: true, bodyClass: 'gig-create' },
    component: () => import('@/views/gigs/GigNew.vue')
  },
  {
    path: '/anuncio/nuevo/:slug',
    name: 'gig.success',
    meta: { requiresAuth: true, isTeacher: true, bodyClass: 'gig-success' },
    component: () => import('@/views/gigs/GigSuccess.vue')
  },
  {
    path: '/anuncio/editar/:slug',
    name: 'gig.edit',
    meta: { requiresAuth: true, isTeacher: true, bodyClass: 'gig-edit' },
    component: () => import('@/views/gigs/GigEdit.vue')
  },
  {
    path: '/anuncio/nuevo/premium',
    name: 'gig.premium',
    meta: { requiresAuth: true, isTeacher: true, bodyClass: 'gig-premium' },
    component: () => import('@/views/gigs/GigIsPremium.vue')
  },
  {
    path: '/gig/:slug',
    name: 'gig.show',
    meta: { bodyClass: 'page-gig-show', requiresAuth: true },
    component: () => import('@/views/gigs/Gig.vue')
  },
  {
    path: '/gig/:slug/reservacion',
    name: 'gig.reservation',
    meta: { requiresAuth: true, bodyClass: 'page-gig-reservation', isVerified: true },
    component: () => import('@/views/gigs/GigReservation.vue')
  },
  {
    path: '/gig/:id/reservacion/edit',
    name: 'gig.reservation.edit',
    meta: { requiresAuth: true, bodyClass: 'GigReservationEdit', isVerified: true},
    component: () => import('@/views/gigs/GigReservationEdit.vue')
  },
  {
    path: '/gig/:slug/reservacion/completada/:id',
    name: 'gig.reservation.complete',
    meta: { requiresAuth: true, bodyClass: 'punku-page-center' },
    component: () => import('@/views/gigs/GigReservationComplete.vue')
  },
  {
    path: '/clase/:id',
    name: 'class.reservation.show',
    meta: { requiresAuth: true, bodyClass: 'page-class-show' },
    component: () => import('@/views/class/ClassDetail.vue')
  },
]

export default routes
