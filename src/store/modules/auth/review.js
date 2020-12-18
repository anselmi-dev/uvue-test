export default {
  /**
   * state
   */
  state: {},
  /**
   * getters
   */
  getters: {
    review: state => {
      return state.user.teacher.reviews
    },
  },
  /**
   * actions
   */
  actions: {
  },
  /**
   * mutations
   */
  mutations: {
  }
}
