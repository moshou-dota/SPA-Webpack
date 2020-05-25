const path = require('path')
const config = require('../config')
const miniCssExtractPlugin = require('mini-css-extract-plugin');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoader = function (options) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (name, option) {
    const loaders = options.usePostCSS? [postLoader, cssLoader]: [cssLoader]

    if (name) {
      loaders.unshift({
        loader: name,
        options: option || {}
      })
    }

    if (options.extract) {
      return [{
        loader: miniCssExtractPlugin.loader,
        options: {
          // publicPath: '' // 如果对分离的css中的其他静态资源路径需要特殊处理的，可在此修改，如背景图片的地址
        }
      }].concat(loaders)
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    scss: generateLoaders('sass'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
  }
}

exports.styleLoader = function (options) {
  let output = []
  const loaders = exports.cssLoader(options)
  for(let key in loaders) {
    output.push({
      test: new RegExp(`/\.${key}$/`),
      use: loaders[key]
    })
  }
  return output
}