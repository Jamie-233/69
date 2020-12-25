const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[fullhash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: path.join(__dirname, '/node_modules'),
        loader: 'babel-loader'
      }
    ]
  }
}
