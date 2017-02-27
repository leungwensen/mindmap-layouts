const path = require('path')

function resolve (pathname) {
  return path.resolve(__dirname, pathname)
}

module.exports = {
  entry: {
    'demo/dist/right-logical': resolve('./demo/src/right-logical.js'),
    'demo/dist/downward-organizational': resolve('./demo/src/downward-organizational.js'),
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
