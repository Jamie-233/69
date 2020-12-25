const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
  },
  module: {
    rules: [
      {
        test: '/\.jsx$',
        loader: 'babel-loader',
        options: ['es2015'],
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'dist')
        ]
      }
    ]
  }
}

// /public/app.hash.js
