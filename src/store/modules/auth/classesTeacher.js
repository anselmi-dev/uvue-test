import ClassesService from '@/services/classes.service';

export default {
  state: {
    classes_teacher: {
      reserve: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
        isLoading: true
      },
      pending: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
        isLoading: true
      },
      confirmed: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
        isLoading: true
      },
      rejected: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
        isLoading: true
      },
      completed: {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
        isLoading: true
      },
    },
  },

  /**
   * getters
   */
  getters: {
    classes_teacher: state => {
      return state.classes_teacher
    },
    classes_teacher_reserve: state => {
      return state.classes_teacher.reserve
    },
    classes_teacher_pending: state => {
      return state.classes_teacher.pending
    },
    classes_teacher_confirmed: state => {
      return state.classes_teacher.confirmed
    },
    classes_teacher_rejected: state => {
      return state.classes_teacher.rejected
    },
    classes_teacher_completed: state => {
      return state.classes_teacher.completed
    },
  },

  /**
   * actions
   */
  actions: {
    resetAllClassTeacher ({ commit, dispatch }) {
      commit('CLEAR_CLASS_TEACHER')
      dispatch('classTeacherConfirmed')
      dispatch('classTeacherPending')
      dispatch('classTeacherCompleted')
    },
    clearClassTeacher ({ commit, state }, type) {
      commit('CLEAR_CLASS_TEACHER', type)
    },
    reserveClassTeacher ({ commit, state }, data = {}) {
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
    classTeacherPending ({ commit, state }, data = null) {
      data = data ? data : {role: 2, page: state.classes_teacher.pending.nextPage}
      return ClassesService.classPending(data)
      .then(
        resp => {
          commit('PUSH_PENDING_TEACHER', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
        )
    }, 
    classTeacherConfirmed ({ commit, state }, data = null) {
      data = data ? data : {role: 2, page: state.classes_teacher.confirmed.nextPage}
      return ClassesService.classConfirmed(data)
      .then(
        resp => {
          commit('PUSH_CONFIRMED_TEACHER', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    classTeacherRejected ({ commit, state }, data = null) {
      data = data ? data : {role: 2, page: state.classes_teacher.rejected.nextPage}
      return ClassesService.classRejected(data)
      .then(
        resp => {
          commit('PUSH_REJECTED_TEACHER', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    classTeacherCompleted ({ commit, state }, data = null) {
      data = data ? data : {role: 2, page: state.classes_teacher.completed.nextPage}
      return ClassesService.classCompleted(data)
      .then(
        resp => {
          commit('PUSH_COMPLETED_TEACHER', resp)
          return Promise.resolve(resp)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    classTeacherWithError ({ commit }, data = {}) {
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

    switchClassTeacherState ({ commit, dispatch, state }, data = {}) {
      return ClassesService.switchClassState(data)
      .then(
        resp => {
          // commit('CLEAR_CLASS_TEACHER', data.status)
          // commit('SWITCH_CLASS_TEACHER', data)
          switch (data.status) {
            case 'PENDIENTE':
              // dispatch('classTeacherPending')
              break;
            case 'CONFIRMADA':
              // dispatch('classTeacherConfirmed')
              break;
            case 'FINALIZADA':
              // dispatch('classTeacherCompleted')
              break;
            default:
              break;
          }
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
    PUSH_RESERVE_TEACHER (state, items) {
      state.classes_teacher.reserve.items = [
        ...state.classes_teacher.reserve.items,
        ...items.docs
      ]
      state.classes_teacher.reserve.nextPage = items.nextPage
      state.classes_teacher.reserve.totalDocs = items.totalDocs
      state.classes_teacher.reserve.load = false
    },
    PUSH_PENDING_TEACHER (state, items) {
      state.classes_teacher.pending.items = [
        ...state.classes_teacher.pending.items,
        ...items.docs
      ]
      state.classes_teacher.pending.nextPage = items.nextPage
      state.classes_teacher.pending.totalDocs = items.totalDocs
      state.classes_teacher.pending.load = false
    },
    PUSH_CONFIRMED_TEACHER (state, items) {
      state.classes_teacher.confirmed.items = [
        ...state.classes_teacher.confirmed.items,
        ...items.docs
      ]
      state.classes_teacher.confirmed.nextPage = items.nextPage
      state.classes_teacher.confirmed.totalDocs = items.totalDocs
      state.classes_teacher.confirmed.load = false
    },
    PUSH_REJECTED_TEACHER (state, items) {
      state.classes_teacher.rejected.items = state.classes.rejected.items.concat(items.docs)
      state.classes_teacher.rejected.nextPage = items.nextPage
      state.classes_teacher.rejected.totalDocs = items.totalDocs
      state.classes_teacher.rejected.load = false
    },
    PUSH_COMPLETED_TEACHER (state, items) {
      state.classes_teacher.completed.items = [
        ...state.classes_teacher.completed.items,
        ...items.docs
      ]
      state.classes_teacher.completed.nextPage = items.nextPage
      state.classes_teacher.completed.totalDocs = items.totalDocs
      state.classes_teacher.completed.load = false
    },
    RESERVE_CLASS_TEACHER (state, gig) {
      state.user.teacher_teacher.gigs.push(gig)
    },
    SWITCH_CLASS_TEACHER (state, data) {
      let removeIndex = null
      switch(data.type) {
        case 'PENDIENTE':
          removeIndex = state.classes_teacher.pending.items.map(c => c._id).indexOf(data.id)
          if (removeIndex > -1) {
            state.classes_teacher.pending.items.splice(removeIndex, 1)
            state.classes_teacher.pending.totalDocs = state.classes_teacher.pending.totalDocs - 1
          }
          break;
        case 'CONFIRMADA':
          removeIndex = state.classes_teacher.confirmed.items.map(c => c._id).indexOf(data.id)
          if (removeIndex > -1) {
            state.classes_teacher.confirmed.items.splice(removeIndex, 1)
            state.classes_teacher.confirmed.totalDocs = state.classes_teacher.confirmed.totalDocs - 1
          }
          break;
        case 'FINALIZADA':
          removeIndex = state.classes_teacher.completed.items.map(c => c._id).indexOf(data.id)
          if (removeIndex > -1) {
            state.classes_teacher.completed.items.splice(removeIndex, 1)
            state.classes_teacher.completed.totalDocs = state.classes_teacher.completed.totalDocs - 1
          }
          break;
        case 'RECHAZADA':
          removeIndex = state.classes_teacher.[data.origin].items.map(c => c._id).indexOf(data.id)
          break;
        default:
          // code block
      }
    },
    CLEAR_CLASS_TEACHER (state, type) {
      const empyt = {
        items: [],
        load: true,
        nextPage: 1,
        totalDocs: 0,
      }
      switch(type) {
        case 'PENDIENTE':
            state.classes_teacher.pending= empyt
          break;
        case 'CONFIRMADA':
            state.classes_teacher.confirmed= empyt
          break;
        case 'FINALIZADA':
            state.classes_teacher.completed= empyt
          break;
        case 'RECHAZADA':
            state.classes_teacher.rejected= empyt
          break;
        default:
            state.classes_teacher.pending = Object.assign({},empyt)
            state.classes_teacher.confirmed = Object.assign({},empyt)
            state.classes_teacher.completed = Object.assign({},empyt)
            state.classes_teacher.rejected = Object.assign({},empyt)
          break;
          // code block
      }
    }
  }
}
