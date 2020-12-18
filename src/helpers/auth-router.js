import axios from 'axios';
import store from '@/store'
import { authHeader } from '@/helpers/auth-header';

const API_URL = process.env.VUE_APP_API

class AuthRouter {
  /**
   * Verifica que el usuario es profesor
   * @return Boolean
   */
  isAuth () {
    return Boolean(localStorage.getItem('token'))
  }

  /**
   * Verifica que el usuario es profesor
   * @return Boolean
   */
	isTeacher () {
    if (this.isAuth()) {
  		return store.state.auth.user.role == 2
    }
		return false
	}

  /**
   * Verifica si su correo esta verificado
   * @return Boolean
   */
  isVerified () {
    if (this.isAuth()) {
      return store.state.auth.user.is_verified
    }
    return false
  }

  /**
   * Verifica que el usuario sea premium
   * @return {Boolean}
   */
  isPremium () {
    if (this.isAuth()) {
      return store.state.auth.user.teacher.is_premium
    }
    return false
  }

  /**
   * Verificar si puede acceder a ese enlace mediante el Slug
   * @return Boolean
   */
  isMeSlug (slug) {
    if (this.isAuth()) {
      return store.state.auth.user.slug == slug
    }
    return false
  }

  /**
   * Obtiene los datos de usuario para verificar su autenticación.
   * @return {Promise}
   */
  getUser () {
    return new Promise((resolve, reject) => {
      if (this.isAuth()) {
        return axios({
          url: API_URL  + '/users/myProfile',
          headers: authHeader()
        }).then(resp => {
          const user = resp.data.user
          if (user)
            store.commit('auth/user', user)
          else {
            localStorage.removeItem('token');
          }
          resolve(resp);
        }).catch(err => {
          localStorage.removeItem('token');
          resolve(err);
        })
      } else
        resolve();
    })
  }
}

export default new AuthRouter();
