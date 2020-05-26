const utils = require('./utils')
const config = require('../config')
const env = require('../config/dev.env')
const webpackBaseConfig = require('./webpack.base.conf')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoader({ sourceMap: config.build.productionSourceMap, usePostCSS: true, extract: true })
  },
  devtool: config.build.productionSourceMap ? config.dev.devtool : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../', 'index.html'), // 可通过在webpack.base,conf中配置context上下文环境，减少path的引入,也可利用config文件提前配置好，直接引用
      filename: 'index.html',
      inject: true, // 默认为true
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none',具体原因参考：https://www.jianshu.com/p/08a60756ffda
    }),
    new miniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: false
    }),
    new optimizeCssPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ],
  optimization: {
    minimizer: [
      new uglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        sourceMap: config.build.productionSourceMap,
        cache: false,
        parallel: false
      }),
    ],
    splitChunks: {
      chunks: "all", // 选择分割哪些代码块，可选值有: 'all'（所有代码块），'async'（按需加载的代码块），'initial'（初始化代码块）
      minSize: 30000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: { // 缓存组
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: {
    hints: 'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
})

if (config.build.productionGzip) {
  const compressionWebpackPlugin = require('compression-webpack-plugin')

  webpackProdConfig.plugins.push(
    new compressionWebpackPlugin({
      assets: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackProdConfig
