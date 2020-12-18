import CreditCardServices from '@/services/credit-card.service'

export default {
  /**
   * state
   */
  state: {},
  /**
   * getters
   */
  getters: {
    user_cards: state => {
      return state.user.user_cards
    },
  },
  /**
   * actions
   */
  actions: {
    createCreditCard ({ commit }, card) {
      return CreditCardServices.create(card)
      .then(
        resp => {
          commit('ADD_CREDIT_CARD', resp.data)
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
    destroyCreditCard ({ commit }, id_card) {
      return CreditCardServices.destroy(id_card)
        .then(
          resp => {
            commit('REMOVE_CREDIT_CARD', id_card)
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
  },
  /**
   * mutations
   */
  mutations: {
    ADD_CREDIT_CARD (state, card) {
      state.user.user_cards.push(card)
    },
    REMOVE_CREDIT_CARD (state, id) {
      const removeIndex = state.user.user_cards.map(card => card._id).indexOf(id)
      state.user.user_cards.splice(removeIndex, 1)
    },
  }
}
