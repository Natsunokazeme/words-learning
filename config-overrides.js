const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglyfyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function override(config, env) {
  // 修改 Webpack 配置
  // 例如，添加一个别名，使得可以使用 @ 符号来引入模块
  config.plugins.push(new BundleAnalyzerPlugin({}))
  // config.plugins.push(
  //   new UglyfyJsPlugin({
  //     uglifyOptions: {
  //       test: /\.ts($|\?)/i,
  //     },
  //   })
  // )
  config.optimization.minimizer = [new UglyfyJsPlugin({})]
  config.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        name: 'vendor',
        chunks: 'initial',
        minChunks: 2,
      },
      common: {
        name: 'common',
        chunks: 'initial',
        minChunks: 2,
      },
    },
  }

  // 返回修改后的配置
  return config
}
