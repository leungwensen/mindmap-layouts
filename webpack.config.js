const path = require('path')

function resolve (pathname) {
  return path.resolve(__dirname, pathname)
}

module.exports = {
  entry: {
    'demo/dist/index': resolve('./demo/src/index.js'),
    'dist/mindmap-layouts': resolve('./lib/index')
  },
  output: {
    filename: '[name].js',
    library: 'MindmapLayouts',
    libraryTarget: 'umd',
    path: resolve('./')
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
            'stage-3'
          ]
        }
      }
    ]
  }
}
