import UserService from '@/services/user.service';

export default {
  /**
   * state
   */
  state: {},
  /**
   * getters
   */
  getters: {
    user: state => {
      return state.user
    },
    isTeacher: state => {
      return state.user ? state.user.role == '2' : false
    },
    isAuth: state => {
      return Boolean(state.user)
    }
  },
  /**
   * actions
   */
  actions: {

    userUpdate ({ commit }, user) {
      return UserService.update(user).then(
        resp => {
          commit('user', resp.data)
          return Promise.resolve(resp.data)
        },
        err => {
          let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
          try {
            responseError = err.response.data.err
          } catch (e) {}
          return Promise.reject(responseError)
        }
      )
    },

    updateAvatar ({ commit }, user) {
      return UserService.updateAvatar(user).then(
        resp => {
          commit('pic_url', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    sendVerification ({commit}, email) {
      return UserService.sendVerification(email)
      .then(
        resp => {
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    VerifyAccount ({commit}, code) {
      return UserService.VerifyAccount(code)
      .then(
        resp => {
          commit('verified')
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
  },
  /**
   * mutations
   */
  mutations: {
    user (state, user) {
      user.split_name = user.first_name.split(" ")[0]

      user.split_fullname = `${user.first_name.split(" ")[0]} ${user.last_name.split(" ")[0]}`

      state.user = user;
    },
    pic_url (state, pic_url) {
      state.user.pic_url = pic_url
    },
    verified (state) {
      state.user.is_verified = true
    }
  }
}
