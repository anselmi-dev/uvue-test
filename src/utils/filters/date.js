import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).locale('es').format('MM/DD/YYYY')
  }
})

Vue.filter('formatDateHr', (value) => {
  if (value) {
    return moment(String(value)).locale('es').format('MM/DD/YYYY HH:MM')
  }
})

Vue.filter('gigDateCreate', (value) => {
  return value ? moment(String(value)).locale('es').format('LL') : value
})


Vue.filter('LLL', (value) => {
  return value ? moment(String(value)).locale('es').format('LLL') : value
})

Vue.filter('getDay', (value) => {
  return moment(String(value)).format('DD')
})

Vue.filter('getMonth', (value) => {
  moment.locale('es');
  return moment.monthsShort(moment(String(value)).format('MM')-1)
})
