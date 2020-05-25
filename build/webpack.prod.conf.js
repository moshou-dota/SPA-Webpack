const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const env = require('../config/dev.env')
const webpackBaseConfig = require('./webpack.base.conf')

const merge = require('webpack-merge')

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoader({sourceMap: config.build.cssSourceMap, usePostCSS: true, extract: true})
  },
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    
  ]
})