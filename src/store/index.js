import Vue from 'vue'
import Vuex from 'vuex'

import { notifications } from './modules/notifications.module'
import { teacherCreate } from './modules/teacher.create.module'
import { auth } from './modules/auth'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      notifications,
      teacherCreate,
      // authentication,
      auth
    }
  })
}
