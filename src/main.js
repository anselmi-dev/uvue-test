import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import filters from './utils/filters'
import VuePageTransition from 'vue-page-transition'
import VueSlideoutPanel from 'vue2-slideout-panel'
import VueBus from 'vue-bus'
import vmodal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import lineClamp from 'vue-line-clamp'
// import DefaultLayout from '@/layouts/DefaultLayout'
import UserLayout from '@/layouts/UserLayout'
import VueFormulate from '@braid/vue-formulate'
import { es } from '@braid/vue-formulate-i18n'
import VueCurrencyInput from 'vue-currency-input'
import TextareaAutosize from 'vue-textarea-autosize'
import Loading from 'vue-loading-overlay'
import FlatSurfaceShader from 'vue-flat-surface-shader'
import VueObserveVisibility from 'vue-observe-visibility'
import { BootstrapVue } from 'bootstrap-vue'
import VueNotification from '@kugatsu/vuenotification'
import VueMask from 'v-mask'
import money from 'v-money'
import { helpers } from './helpers'
Vue.prototype.$func = helpers

// import { LoaderPlugin } from 'vue-google-login';

// Vue.use(LoaderPlugin, {
//   client_id: '376167615765-brf7h5dt32h63475lg5sl11bmfcsm3kk.apps.googleusercontent.com'
// });

import Meta from 'vue-meta'
Vue.use(Meta)

import VueSocialSharing from 'vue-social-sharing'
const VueScrollTo = require('vue-scrollto')

import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

import { catchError } from '@/global/catchError.js'
import auth from '@/mixins/auth'

const API_URL = process.env.VUE_APP_API
import axios from 'axios'
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.use(money, {
  precision: 0,
  masked: false,
  prefix: 'S/ ',
  decimal: '.',
  thousands: ','
})
Vue.use(VueNotification, {
  position: 'bottomRight',
  error: {
    background: '#F56565',
    color: 'white'
  },
  success: {
    background: '#38A169',
    color: 'white'
  },
  warning: {
    background: '#ED8936',
    color: 'white'
  }
})
// Vue.use(IconsPlugin)
Vue.mixin(auth)
Vue.use(BootstrapVue)
Vue.use(VueSocialSharing)
Vue.use(VueMask)
Vue.use(VueObserveVisibility)
Vue.use(FlatSurfaceShader)
Vue.use(Loading)
Vue.use(TextareaAutosize)
Vue.use(VueScrollTo)
Vue.use(VueCurrencyInput)
Vue.use(vmodal)
Vue.use(VueBus)
Vue.use(VuePageTransition)
Vue.use(VueSlideoutPanel)
Vue.use(Vuelidate)
Vue.use(lineClamp)
Vue.use(VueFormulate, {
  plugins: [es],
  locale: 'es'
})

import VCalendar from 'v-calendar'

Vue.use(VCalendar)

// Vue.component('default-layout', DefaultLayout)
Vue.component('user-layout', UserLayout)

Vue.config.productionTip = false
Vue.prototype.$catchError = catchError

import moment from 'moment'
Vue.prototype.moment = moment

export default () => {
  const store = createStore()
  const router = createRouter()
  return new Vue({
    router,
    store,
    render: h => h(App)
  })
}
