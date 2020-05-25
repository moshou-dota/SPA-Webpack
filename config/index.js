const path = require('path')

module.exports = {
  dev: {
    assetsPublicPath: '',
    assetsSubDirectory: '',
    cssSourceMap: true,
    host: 'localhost',
    port: '8080',
    devtool: 'eval-source-map'
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '',
    assetsSubDirectory: '',
    cssSourceMap: true,
    devtool: '#source-map',
  }
}