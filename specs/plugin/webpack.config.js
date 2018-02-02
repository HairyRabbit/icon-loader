const path = require('path')
const webpack = require('webpack')
const IconWebpackPlugin = require('../../packages/icon-webpack-plugin').default

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    },{
      test: /\.svg$/,
      use: require.resolve('../../packages/icon-loader')
    }]
  },
  plugins: [
    new IconWebpackPlugin({
      context: path.resolve(__dirname, 'icons')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
