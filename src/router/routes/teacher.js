const routes = [
  {
    path: '/buscar-profesor/:slug?',
    name: 'search.teacher',
    meta: { bodyClass: 'page-teacher-search' },
    component: () => import('@/views/search/Teacher.vue')
  },
  {
    path: '/conviertete-profesor',
    name: 'teacher.landing',
    meta: { bodyClass: 'page-teacher-landing' },
    component: () => import('@/views/teacher/create/LandingTeacher2.vue')
  },
  {
    path: '/conviertete-profesor/registro',
    name: 'teacher.create',
    meta: { requiresAuth: true, notRequiresTeacher: true, bodyClass: 'page-teacher-create' },
    component: () => import('@/views/teacher/CreateTeacher.vue')
  },
  {
    path: '/conviertete-profesor/finalizado',
    name: 'teacher.success',
    meta: { requiresAuth: true, bodyClass: 'page-teacher-success' },
    component: () => import('@/views/teacher/create/successTeacher.vue')
  },
  {
    path: 'cursos/crear',
    name: 'course.new',
    meta: { requiresAuth: true, isPremium: true, isTeacher: true },
    component: () => import('@/views/user/course/CourseNew.vue')
  },
]

export default routes
