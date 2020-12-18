import GigsService from '@/services/gigs.service';

export default {
  /**
   * getters
   */
  getters: {
    gigs: state => {
      return state.user.teacher.gigs
    },
  },
  /**
   * actions
   */
  actions: {
    gigCreate ({ commit }, data) {
      return new Promise((resolve, reject) => {
        GigsService.createGig(data)
          .then((resp) => {
            commit('PUSH_GIG', data)
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    gigUpdate ({ commit }, data) {
      return new Promise((resolve, reject) => {
        GigsService.updateGig(data)
          .then((resp) => {
            commit('UPDATE_GIG', resp.data)
            resolve(resp.data)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },

    gigDestroy ({ commit }, id) {
      return GigsService.deleteGig(id)
      .then(
        resp => {
          commit('REMOVE_GIG', id)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
        )
    },
      
    toggleGigs ({ commit }, status) {
      return new Promise((resolve, reject) => {
        GigsService.disableAllGigs(!status)
        .then((resp) => {
          commit('TOGGLE_STATUS', !status)
          resolve(resp.data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },

    gigMakePrincipal ({commit}, id) {
      commit('MAKE_PRINCIPAL', id)
    }
  },
  /**
   * mutations
   */
  mutations: {
    PUSH_GIG (state, gig) {
      state.user.teacher.gigs.push(gig)
    },
    UPDATE_GIG (state, gig) {
      const removeIndex = state.user.teacher.gigs.map(gig => gig._id).indexOf(gig._id)
      state.user.teacher.gigs[removeIndex] = gig
    },
    REMOVE_GIG (state, id) {
      const removeIndex = state.user.teacher.gigs.map(gig => gig._id).indexOf(id)
      if (removeIndex != -1)
        state.user.teacher.gigs.splice(removeIndex, 1)
    },
    MAKE_PRINCIPAL (state, id) {
      state.user.teacher.gigs.forEach((gig, index) => {
        if (gig._id == id) {
          state.user.teacher.gigs[index].main_gig = true
        } else
        state.user.teacher.gigs[index].main_gig = false
      });
    },
    TOGGLE_STATUS (state, status) {
      state.user.teacher.gigs.forEach((gig, index) => {
        gig.is_active = status
      });
    }
  }
}
