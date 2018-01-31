const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  externals: {
    react: 'React'
  },
  module: {
    rules: [{
      test: /\.svg$/,
      use: require.resolve('../../lib/loader')
    }]
  }
}
