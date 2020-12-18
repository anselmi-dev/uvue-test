import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import AuthRouter from '@/helpers/auth-router'
import authRouter from '../helpers/auth-router'

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  AuthRouter.getUser().finally(() => {
    // If doesn't require authentication, accept.
    if (!to.meta.requiresAuth) {
      if (
        localStorage.getItem('token') &&
        (to.name == 'login' || to.name == 'register')
      ) {
        return next('/')
      }
      return next()
    }

    // If require auth but user is not authenticated, go to login.
    if (to.meta.requiresAuth && !AuthRouter.isAuth()) {
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      if (to.meta.isMeSlug && !AuthRouter.isMeSlug(to.params.slug)) {
        return next(to.meta.redirect ? to.meta.redirect : '/')
      }

      if (to.meta.isPremium && !AuthRouter.isPremium()) {
        return next('/premium')
      }

      if (to.meta.isVerified && !AuthRouter.isVerified()) {
        return next({ name: 'account-verified' })
      }

      // Requires you to be authenticated and not be a teacher
      if (to.meta.notRequiresTeacher) {
        if (!AuthRouter.isTeacher()) return next()
        return next('/')
      }

      if (to.meta.isTeacher) {
        if (AuthRouter.isTeacher()) {
          return next()
        } else {
          return next(to.meta.redirect ? to.meta.redirect : '/')
        }
      }
      return next()
    }
    return next('/')
  })
})

export function createRouter() {
  return new VueRouter({
    root: '/',
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
}
