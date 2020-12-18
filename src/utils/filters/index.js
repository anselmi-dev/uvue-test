const filters = require.context('./', false, /.js$/)

filters.keys().map((filter) => {
  import(`${filter}`)
})
