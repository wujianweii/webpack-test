// 动态链接库 一次打包后复用
let path = require('path');
let webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    // test: './src/test.js'
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: "_dll_[name]",
    // libraryTarget: 'var' // var默认 umd commonjs  this...
  },
  plugins: [
    new webpack.DllPlugin({
      // name === library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json') // manifest.json 任务清单·从同名的文件中找相应路径
    })
  ]
}