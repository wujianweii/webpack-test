let { smart } = require('webpack-merge'); // 合并webpack配置文件
let base = require('./webpack.config.js');

module.exports = smart(base, {
  mode: 'development'
})
