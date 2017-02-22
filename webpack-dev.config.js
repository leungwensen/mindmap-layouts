const path = require('path');
const webpackConfig = require('./webpack.config');

function resolve(pathname) {
  return path.resolve(__dirname, pathname);
}

const webpackDevConfig = Object.assign({}, webpackConfig, {
  cache: false,
  devServer: {
    stats: {
      cached: false,
      exclude: [
        /node_modules[\\\/]/
      ],
      colors: true
    },
    contentBase: resolve('./'),
    compress: true,
    host: '0.0.0.0',
    port: 9002,
  },
  devtool: 'source-map',
});

module.exports = webpackDevConfig;
