const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  }
}
