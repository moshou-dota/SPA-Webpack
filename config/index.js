const path = require('path')

module.exports = {
  dev: {
    assetsPublicPath: '',
    assetsSubDirectory: '',

    cssSourceMap: true,

    host: 'localhost',
    port: '8080',
    autoOpenBrowser: true,

    devtool: 'eval-source-map'
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '',
    assetsSubDirectory: 'assets',

    productionSourceMap: true,

    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
}