const path = require('path')
const config = require('../config')
const utils = require('./utils.js')
const copyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|scg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attributes: true,
            minimize: process.env.NODE_ENV === 'production'
          }
        }
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { // 将根目录static中的所有内容复制到dist/static目录下
          from: resolve('static/'),
          to: resolve('dist/static/[name].[ext]')
        }
      ]
    })
  ]
}
