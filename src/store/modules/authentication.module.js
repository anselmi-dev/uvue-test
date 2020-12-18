import axios from 'axios';
import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';
import GigsService from '@/services/gigs.service';

export const authentication = {
  state: {
    status: {},
    user: null
  },
  namespaced: true,
  getters: {
    user: state => {
      return state.user
    },
    isAuth: state => {
      return Boolean(state.user)
    },
    isTeacher: state => {
      if (state.user)
        return state.user.role == '2'
      return null
    },
    isPremium: state => {
      if (state.user && state.user.teacher)
        return state.user.teacher.is_premium
      return null
    }
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        user => {
          commit('registerSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    },
    updateUser({ commit }, user) {
      return UserService.update(user).then(
        resp => {
          const user = resp.data
          commit('updateUser', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    updateAvatar({ commit }, user) {
      return UserService.updateAvatar(user).then(
        resp => {
          commit('updateAvatar', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    removeGig ({ commit }, id) {
      return GigsService.deleteGig(id)
      .then(
        resp => {
          commit('removeGig', id)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    pushMethodPayment ({ commit }, method) {
      commit('pushMethodPayment', method)
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    registerSuccess(state, user) {
      state.status.loggedIn = false;
      state.user = JSON.stringify(user);
    },
    registerFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateAvatar(state, pic_url) {
      state.user.pic_url = pic_url
    },
    removeGig (state, id) {
      const removeIndex = state.user.teacher.gigs.map(gig => gig._id).indexOf(id)
      state.user.teacher.gigs.splice(removeIndex, 1)
    },
    pushMethodPayment (state, method) {
      state.user.user_cards.push(method)
    }
  }
}
