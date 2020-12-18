// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    env: require('./dev.env')
  },
  buildStaging: {
    env: require('./dev.env')
  },
  buildProduction: {
    env: require('./dev.env')
  },
  devStaging: {
    env: require('./dev.env')
  }
}