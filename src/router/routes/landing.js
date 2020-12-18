const routes = [
  {
    path: '/',
    name: 'home',
    meta: { bodyClass: 'page-home' },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    meta: { bodyClass: 'page-faq' },
    component: () => import('@/views/Faq.vue')
  },
  {
    path: '/ayuda',
    name: 'help',
    meta: { bodyClass: 'page-help' },
    component: () => import('@/views/Help.vue')
  },
  {
    path: '/soporte',
    name: 'soport',
    // meta: { transition: 'zoom'},
    meta: { bodyClass: 'page-soport' },
    component: () => import('@/views/Soport.vue')
  },
  {
    path: '/contacto',
    name: 'contact',
    meta: { bodyClass: 'page-contact' },
    component: () => import('@/views/Contact.vue')
  },
  {
    path: '/nosotros',
    name: 'about',
    meta: { bodyClass: 'page-about' },
    component: () => import('@/views/About.vue')
  },
  {
    path: 'terminos-condiciones',
    name: 'terms-conditions',
    meta: { bodyClass: 'page-terms-conditions' },
    component: () => import('@/views/institutional/TermsConditions.vue')
  },
  {
    path: 'politica-privacidad',
    name: 'policies-privacy',
    meta: { bodyClass: 'page-policies-privacy' },
    component: () => import('@/views/institutional/PoliciesPrivacy.vue')
  },
  {
    path: '/premium',
    name: 'premium',
    meta: { bodyClass: 'page-premium', isPremium: false },
    component: () => import('@/views/landing/Premium.vue')
  },
]

export default routes
