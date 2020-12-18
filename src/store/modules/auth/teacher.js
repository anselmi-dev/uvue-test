import TeacherServices from '@/services/teacher.service';

export default {
  /**
   * state
   */
  state: {
  },
  /**
   * getters
   */
  getters: {
    about_me: state => {
      return state.user.teacher.about_me
    },
    is_premium: state => {
      return state.user && state.user.teacher ? state.user.teacher.is_premium : false
    },
    is_active: state => {
      return state.user.teacher.is_active
    },
    premium_since: state => {
      return state.user.teacher.premium_since
    },
    schedule: state => {
      return state.user.teacher.schedule
    },
    created_at: state => {
      return state.user.teacher.created_at
    },
  },
  /**
   * actions
   */
  actions: {
    teacherCreate ({ commit }, data) {
      return new Promise((resolve, reject) => {
        TeacherServices.becomeTeacher(data)
          .then((resp) => {
            commit('SET_TEACHER', data)
            resolve(resp)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      })
    },
  },
  /**
   * mutations
   */
  mutations: {
    SET_TEACHER (state, teacher) {
      state.user.teacher = teacher;
      state.user.teacher.gigs = [];
      state.user.role = 2
    },
  }
}
