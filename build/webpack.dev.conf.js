const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const env = require('../config/dev.env')
const webpackBaseConfig = require('./webpack.base.conf')

const merge = require('webpack-merge')
const portfinder = require('portfinder') // 用于当设置端口被占用是，自动获取其他端口启动服务
const friendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 有好的错误提示组件

const webpackDevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoader({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new Webpack.NamedModulesPlugin(), // 以便更容易查看要修补(patch)的依赖
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    overlay: true,//出现错误之后会在页面中出现遮罩层提示
    host: process.env.HOST || config.dev.host || '127.0.0.1',
    port: process.env.PORT || config.dev.port || 8080
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = webpackDevConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      webpackDevConfig.devServer.port = port
      
      webpackDevConfig.plugins.push(new friendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackDevConfig.devServer.host}:${port}`]
        },
        onErrors: undefined
      }))

      resolve(webpackDevConfig)
    }
  })
})
