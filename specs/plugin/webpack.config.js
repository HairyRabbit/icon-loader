const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IconWebpackPlugin = require('../../lib/plugin').default

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.svg$/,
      use: require.resolve('../../lib/loader')
    }]
  },
  plugins: [
    new IconWebpackPlugin({
      context: path.resolve(__dirname, 'icons')
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin()
  ]
}
