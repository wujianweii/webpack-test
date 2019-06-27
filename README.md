# webpack

`npm install --save-dev ***`

### problem

 - eslint
   Error: Cannot find module 'eslint/lib/formatters/stylish' 未解决







### webpack

时间
webpack.config.js - 32.28 33.00
package.json -

其余
更改配置文件名 - npx webpack -- config webpack.config.my.js
本地服务 - yarn add webpack-dev-server -D
生成模版 - yarn add html-webpack-plugin -D

dev - 写到内存中·静态服务


### css


css 模块引入
css-loader - 43.30 - @import
yarn add css-loader style-loader -D

style-loader - 放在style标签中

less - 49.10 yarn add

sass
stylus 49.40

min-css-extract-pulgin - 51.52 抽离样式  需要自己压缩文件-
增加浏览器前缀 - postcss-loader - 56.25 58.59


npm install --save-dev postcss-loader autoprefix
npm install --save-dev terser-webpack-plugin
npm install --save-dev optimize-css-assets-webpack-plugin
npm install --save-dev mini-css-extract-plugin

 - OptimizeCSSAssetsPlugin压缩css没有成功 
 - postcss 增加前缀失败

看这种视频 感觉不能光看 应该跟着一起操作应该会更投入·同时做好笔记

###7 js es6

yarn add babel-loader @babel/core @babel/preset-env -D
https://babeljs.io/docs/en/babel-plugin-proposal-decorators （js打包）


