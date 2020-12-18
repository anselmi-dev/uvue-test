import ClassesService from '@/services/classes.service';

export default {
  state: {
    classes: {
      reserve: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      },
      pending: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      },
      confirmed: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      },
      rejected: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      },
      completed: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      },
    }
  },

  /**
   * getters
   */
  getters: {
    classes: state => {
      return state.classes
    },
    classes_reserve: state => {
      return state.classes.reserve
    },
    classes_pending: state => {
      return state.classes.pending
    },
    classes_confirmed: state => {
      return state.classes.confirmed
    },
    classes_rejected: state => {
      return state.classes.rejected
    },
    classes_completed: state => {
      return state.classes.completed
    },
  },
  /**
   * actions
   */
  actions: {
    resetAllClass ({ commit, dispatch }) {
      commit('CLEAR_CLASS')
      dispatch('classConfirmed')
      dispatch('classPending')
      dispatch('classCompleted')
    },
    clearClass ({ commit }, type) {
      commit('CLEAR_CLASS', type)
    },
    reserveClass ({ commit }, data) {
      return ClassesService.reserveClass(data)
      .then(
        resp => {
          // commit('RESERVE_CLASS', data)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    classPending ({ commit, state }, data = null) {
      data = data ? data : {role: 3, page: state.classes.pending.nextPage}
      return ClassesService.classPending(data)
      .then(
        resp => {
          commit('PUSH_PENDING', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    classConfirmed ({ commit, state }, data = null) {
      data = data ? data : {role: 3, page: state.classes.confirmed.nextPage}
      return ClassesService.classConfirmed(data)
      .then(
        resp => {
          commit('PUSH_CONFIRMED', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    classRejected ({ commit, state }, data = null) {
      data = data ? data : {role: 3, page: state.classes.rejected.nextPage}
      return ClassesService.classRejected(data)
      .then(
        resp => {
          commit('PUSH_REJECTED', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    classCompleted ({ commit, state }, data = null) {
      data = data ? data : {role: 3, page: state.classes.completed.nextPage}
      return ClassesService.classCompleted(data)
      .then(
        resp => {
          commit('PUSH_COMPLETED', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    classWithError ({ commit }, data = {}) {
      return ClassesService.classWithError(data)
      .then(
        resp => {
          // commit('PUSH_WITHERROR', resp.docs)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    switchClassState ({ commit, dispatch, state }, data = {}) {
      return ClassesService.switchClassState(data)
      .then(
        resp => {
          // commit('CLEAR_CLASS', data.status)
          // commit('SWITCH_CLASS', data)
          switch (data.status) {
            case 'PENDIENTE':
              // dispatch('classPending')
              break;
            case 'CONFIRMADA':
              // dispatch('classConfirmed')
              break;
            case 'FINALIZADA':
              dispatch('classCompleted')
              break;
            default:
              break;
          }
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    getClassReserved ({commit}, data = {}) {
      return ClassesService.getClassReserved(data)
      .then(
        resp => {
          // commit('CLASS_RESERVED', resp)
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
    PUSH_RESERVE (state, items) {
      state.classes.reserve.items = [
        ...state.classes.reserve.items,
        ...items.docs
      ]
      state.classes.reserve.nextPage = items.nextPage
      state.classes.reserve.totalDocs = items.totalDocs
      state.classes.reserve.load = false
    },
    PUSH_PENDING (state, items) {
      state.classes.pending.items = [
        ...state.classes.pending.items,
        ...items.docs
      ]
      state.classes.pending.nextPage = items.nextPage
      state.classes.pending.totalDocs = items.totalDocs
      state.classes.pending.load = false
    },
    PUSH_CONFIRMED (state, items) {
      state.classes.confirmed.items = [
        ...state.classes.confirmed.items,
        ...items.docs
      ]
      state.classes.confirmed.nextPage = items.nextPage
      state.classes.confirmed.totalDocs = items.totalDocs
      state.classes.confirmed.load = false
    },
    PUSH_REJECTED (state, items) {
      state.classes.rejected.items = [
        ...state.classes.rejected.items,
        ...items.docs
      ]
      state.classes.rejected.nextPage = items.nextPage
      state.classes.rejected.totalDocs = items.totalDocs
      state.classes.rejected.load = false
    },
    PUSH_COMPLETED (state, items) {
      state.classes.completed.items = [
        ...state.classes.completed.items,
        ...items.docs
      ]
      state.classes.completed.nextPage = items.nextPage
      state.classes.completed.totalDocs = items.totalDocs
      state.classes.completed.load = false
    },
    RESERVE_CLASS (state, gig) {
      state.user.teacher.gigs.push(gig)
    },
    SWITCH_CLASS (state, data) {
      let removeIndex = null
      switch(data.type) {
        case 'PENDIENTE':
          removeIndex = state.classes.pending.items.map(c => c._id).indexOf(data.id)
          if (removeIndex > -1) {
            state.classes.pending.items.splice(removeIndex, 1)
            state.classes.pending.totalDocs = state.classes.pending.totalDocs - 1
          }
          break;
        case 'CONFIRMADA':
          removeIndex = state.classes.confirmed.items.map(c => c._id).indexOf(data.id)
          if (removeIndex > -1) {
            state.classes.confirmed.items.splice(removeIndex, 1)
            state.classes.confirmed.totalDocs = state.classes.confirmed.totalDocs - 1
          }
          break;
        case 'FINALIZADA':
          removeIndex = state.classes.completed.items.map(c => c._id).indexOf(data.id)
          if (removeIndex > -1) {
            state.classes.completed.items.splice(removeIndex, 1)
            state.classes.completed.totalDocs = state.classes.completed.totalDocs - 1
          }
          break;
        case 'RECHAZADA':
          removeIndex = state.classes.[data.origin].items.map(c => c._id).indexOf(data.id)
          break;
        default:
          // code block
      }
    },
    CLEAR_CLASS (state, type = null) {
      const empyt = {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      }
      switch(type) {
        case 'PENDIENTE':
            state.classes.pending= empyt
          break;
        case 'CONFIRMADA':
            state.classes.confirmed= empyt
          break;
        case 'FINALIZADA':
            state.classes.completed= empyt
          break;
        case 'RECHAZADA':
            state.classes.rejected= empyt
            break;
        default:
          state.classes.pending = Object.assign({},empyt)
          state.classes.confirmed = Object.assign({},empyt)
          state.classes.completed = Object.assign({},empyt)
          state.classes.rejected = Object.assign({},empyt)
          break;
          // code block
      }
    }
  }
}
