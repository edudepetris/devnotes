process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

// https://github.com/rails/webpacker/issues/1818#issuecomment-533589724
environment.loaders.get('babel').exclude = [
  /\.test\.js$/,
  /\.stories\.js$/,
  environment.loaders.get('babel').exclude,
]

module.exports = environment.toWebpackConfig()
