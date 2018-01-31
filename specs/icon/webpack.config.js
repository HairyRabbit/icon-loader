const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      icon: path.resolve(__dirname)
    }
  },
  module: {
    rules: [{
      test: /\.svg$/,
      use: {
        loader: require.resolve('../../lib/loader'),
        options: {}
      }
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG'])
  ]
}
