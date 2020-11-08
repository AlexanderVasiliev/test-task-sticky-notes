const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [{
      test: [/\.ts$/, /\.tsx$/],
      exclude: [/node_modules/],
      use: [{
        loader: 'ts-loader',
      }]
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
