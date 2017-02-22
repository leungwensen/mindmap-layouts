const path = require('path');

function resolve(pathname) {
  return path.resolve(__dirname, pathname);
}

module.exports = {
  entry: {
    'demo/hierarchical': resolve('./demo/src/hierarchical.js'),
  },
  output: {
    path: resolve('./'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2017',
            'stage-0',
            'stage-1',
            'stage-2',
            'stage-3',
          ],
        },
      },
    ],
  },
};
