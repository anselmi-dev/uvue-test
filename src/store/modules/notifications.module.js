import NotificationsService from '@/services/notifications.service';

export const notifications = {
  state: {
    options: null,
    show: false,
    notifications: {
      docs: [],
      nextPage: 1,
      totalDocs: 0,
      limit: 20,
      isLoading: true,
      totalUnread: 0
    },
    events: {
      docs: [],
      nextPage: 1,
      totalDocs: 0,
      limit: 12,
      isLoading: true
    }
  },
  namespaced: true,
  getters: {
    options: state => {
      return state.options
    },
    show: state => {
      return state.show
    },
    notifications: state => {
      return state.notifications
    }
  },
  actions: {
    getNotifications ({ commit, state }) {
      commit('LOADING')
      NotificationsService.getNotifications({
        limit: state.notifications.limit,
        page: state.notifications.nextPage
      })
      .then(
        resp => {
          commit('SET_NOTIFICATIONS', resp)
          commit('LOADING', false)
          return Promise.resolve(resp)
        },
        error => {
          commit('LOADING', false)
          return Promise.reject(error)
        }
      )
    },
    markAllAsRead ({ commit, state }) {
      if (state.notifications.totalUnread)
        NotificationsService.markAllAsRead()
        .then(
          resp => {
            commit('TOTAL_UNREAD_NOTIFICATIONS')
            return Promise.resolve(resp)
          },
          error => {
            return Promise.reject(error)
          }
        )
    },
    getEvents ({ commit }, options = {}) {
      commit('LOADING')
      NotificationsService.getNotifications(options)
      .then(
        resp => {
          commit('SET_NOTIFICATIONS', resp)
          commit('LOADING', false)
          return Promise.resolve(resp)
        },
        error => {
          commit('LOADING', false)
          return Promise.reject(error)
        }
      )
    },
    resetNotifications ({ commit, state }) {
      commit('LOADING', true)
      commit('RESET_NOTIFICATIONS')
      NotificationsService.getNotifications({
        limit: state.notifications.limit,
        page: state.notifications.nextPage
      })
      .then(
        resp => {
          commit('SET_NOTIFICATIONS', resp)
          commit('LOADING', false)
          return Promise.resolve(resp)
        },
        error => {
          commit('LOADING', false)
          return Promise.reject(error)
        }
      )
    },
    push({ commit }, options) {
      commit('push', options)
    },
  },
  mutations: {
    RESET_NOTIFICATIONS (state) {
      state.notifications.docs = []
      state.notifications.nextPage = 1
      state.notifications.totalDocs = 0
      state.notifications.limit = 20
      state.notifications.isLoading= true
    },
    SET_NOTIFICATIONS (state, notifications) {
      state.notifications.docs = [
        ...state.notifications.docs,
        ...notifications.notiList.docs
      ]
      state.notifications.totalUnread = notifications.totalUnread
      state.notifications.nextPage = notifications.notiList.nextPage
      state.notifications.totalDocs = notifications.notiList.totalDocs
      state.notifications.limit = notifications.notiList.limit
    },
    TOTAL_UNREAD_NOTIFICATIONS (state) {
      state.notifications.totalUnread = 0
    },
    READ_ALL_NOTIFICATIONS (state, notifications) {
      for (var i = state.notifications.docs.length - 1; i >= 0; i--) {
        state.notifications.docs[i].status = true
      }
    },
    LOADING (state, status = true) {
      state.notifications.isLoading = status
    },
    push(state, options) {
      state.options = options
      if (state.options)
        state.show = true
      else
        state.show = false
    },
  }
}
