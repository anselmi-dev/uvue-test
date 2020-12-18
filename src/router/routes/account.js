export default [
	{
  	path: '/mi-cuenta',
  	meta: { requiresAuth: true },
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: '/',
  	    name: 'account.dashboard',
        meta: { requiresAuth: true },
        component: () => import('@/views/user/Account.vue'),
      },
    	{
    		path: 'mis-clases',
    		name: 'account.classes',
        meta: { requiresAuth: true },
      	component: () => import('@/views/user/Classes.vue')
    	},
      {
        path: 'mis-clases/dictar',
        name: 'account.classes.teach',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/user/ClassesTeach.vue')
      },
    	{
    		path: 'mis-metodos-pago',
    		name: 'account.payment-methods',
        meta: { requiresAuth: true },
      	component: () => import('@/views/user/PaymentMethods.vue')
    	},
      {
        path: 'profesor',
        name: 'account.teacher',
        meta: { requiresAuth: true, isTeacher: true, redirect: {name: 'account.dashboard'} },
        component: () => import('@/views/user/Teacher.vue')
      },
      {
        path: 'mi-agenda',
        name: 'account.diary',
        meta: { requiresAuth: true },
        component: () => import('@/views/user/MyDiary.vue')
      },
      {
        path: 'mis-conferencias',
        name: 'account.conferences',
        meta: { requiresAuth: true },
        component: () => import('@/views/user/MyConferences.vue')
      },
      {
        path: 'mis-interacciones',
        name: 'account.interactions',
        meta: { requiresAuth: true },
        component: () => import('@/views/user/Interactions.vue')
      },
      {
        path: 'mis-conferencias/dictar',
        name: 'account.conferences.teach',
        meta: { requiresAuth: true, isPremium: true, isTeacher: true },
        component: () => import('@/views/user/MyConferencesTeach.vue')
      },
      {
        path: 'mis-cursos',
        name: 'account.courses',
        meta: { requiresAuth: true },
        component: () => import('@/views/user/Courses.vue')
      },
      {
        path: 'mis-cursos/dictar',
        name: 'account.courses.teach',
        meta: { requiresAuth: true, isPremium: true, isTeacher: true },
        component: () => import('@/views/user/CoursesTeach.vue')
      },
      {
        path: 'configuraciones',
        name: 'account.configurations',
        meta: { requiresAuth: true },
        component: () => import('@/views/user/Configurations.vue')
      },
      {
        path: 'profesor/mis-anuncios',
        name: 'account.teacher.gigs',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/teacher/account/Gigs.vue')
      },
      {
        path: 'profesor/mis-disponibilidad',
        name: 'account.teacher.availability',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/teacher/account/Availability.vue')
      },
      {
        path: 'profesor/mis-estadisticas',
        name: 'account.teacher.statistics',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/teacher/account/Statistics.vue')
      },
      {
        path: 'profesor/mis-recomendaciones',
        name: 'account.teacher.recomendations',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/teacher/account/Recomendations.vue')
      },
      {
        path: 'profesor/mis-estudiantes',
        name: 'account.teacher.my-students',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/teacher/account/MyStudents.vue')
      },
      {
        path: 'profesor/preferencias',
        name: 'account.teacher.confirguration',
        meta: { requiresAuth: true, isTeacher: true },
        component: () => import('@/views/teacher/account/Confirguration.vue')
      },
    ]
	},
  {
    path: '/linkedin/callback',
    name: 'linkedin.callback',
    meta: { requiresAuth: false },
    component: () => import('@/views/auth/linkedinCallBack.vue')
  }
]
