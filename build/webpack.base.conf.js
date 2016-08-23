const path = require('path')
// const webpack = require('webpack')
const config = require('../config')
const qs = require('qs')
const projectRoot = path.resolve(__dirname, '../')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('main.css')
const autoprefixer = require('autoprefixer')
const SvgStore = require('webpack-svgstore-plugin')
const svgSprite = new SvgStore({
  // svgo options
  svgoOptions: {
    plugins: [
      { removeTitle: true }
    ]
  }
})

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      {
        test: /\.css$/i,
        loader: extractCSS.extract(['css', 'postcss'])
      },
      {
        test: /\.scss$/i,
        loader: extractCSS.extract(['css', 'postcss', 'sass'])
      },
      {
        test: /\.js/,
        loader: 'babel',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
        loaders: [
          'file?' + qs.stringify({
            name: path.join(config.build.assetsSubDirectory, 'assets/[name]_[md5:hash:hex:8].[ext]')
          }),
          'image-webpack?' + JSON.stringify({
            bypassOnDebug: true,
            progressive: true,
            optimizationLevel: 7,
            interlaced: true,
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            svgo: {
              removeUnknownsAndDefaults: false,
              cleanupIDs: false
            }
          })
        ]
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  },
  plugins: [
    extractCSS,
    svgSprite
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
