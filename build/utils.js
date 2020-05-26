const path = require('path')
const config = require('../config')
const miniCssExtractPlugin = require('mini-css-extract-plugin');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoader = function (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, option) {
    const loaders = options.usePostCSS? [cssLoader, postCssLoader]: [cssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, option, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return [{
        loader: miniCssExtractPlugin.loader,
        options: {
          publicPath: '../../' // 如果对分离的css中的其他静态资源路径需要特殊处理的，可在此修改，如背景图片的地址
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
      test: new RegExp(`\\.${key}$`), // 注意两个斜杠
      use: loaders[key]
    })
  }
  return output
}
