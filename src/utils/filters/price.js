import Vue from 'vue'

Vue.filter('currency', (value) => {
  if (isNaN(value)) {
    return value
  }
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2
  }).format(value)
})

Vue.filter('currencySol', (value) => {
  if (isNaN(value)) {
    return value
  }
  return 'S/ ' + new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0
  }).format(value)
})

Vue.filter('currencySolHr', (value) => {
  if (isNaN(value)) {
    return value
  }
  return 'S/ ' + new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0
  }).format(value) + ` <small class="h9">por hora</small>`
})


Vue.filter('currencySolHrSimple', (value) => {
  if (isNaN(value)) {
    return value
  }
  return 'S/ ' + new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0
  }).format(value) + ` <small class="h9">/h</small>`
})

