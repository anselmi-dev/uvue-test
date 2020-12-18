// const webpack = require('webpack');
const isProd = process.env.VUE_ENV === "production";
process.env.VUE_APP_VERSION = require('./package.json').version
// "development", "production" or "test"

module.exports = {
  assetsDir: "assets",
  // configureWebpack: {
  //   module: {
  //     rules: [      {
  //       test: /\.svg$/,
  //       use: [
  //         'babel-loader',
  //         'vue-svg-loader',
  //       ],
  //     }]
  //   }
  // },
  devServer: {
    // host: 'punku.local.com',
    // port: 80,
    https: Boolean(process.env.VUE_APP_HTTPS == 1)
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~bootstrap/scss/functions";
          @import "~bootstrap/scss/mixins";
          @import "~@/scss/_variables.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  }
}
