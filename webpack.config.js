// webpack - node编写

// webpack-dev-server 
// webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。
// 当 mode 为 development 时，会具备 hot reload 的功能，即当源码文件变化时，会即时更新当前页面，以便你看到最新的效果。


// import path from "path";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到单独的文件中
// const TerserJSPlugin = require('terser-webpack-plugin'); // js压缩
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩

// 插件
// 1） CleanWebpackPlugin // 打包前删除原打包文件
// 2)  CopyWebpackPlugin // 打包时将别的文件打包(拷贝文件)
// 3)  BannerPlugin 内置 版权声明 给每个js加上字符串
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

// 模块 Happypack 能实现多线程打包
// const Happypack = require('happypack');
// import webpack from "webpack";
const webpack = require("webpack");
module.exports = {
  // 优化项
  optimization: {
    // 之前使用 commonChunkPlugins
    // splitChunks: { // 分割代码块
    //   cacheGroups: { // 缓存组
    //     common: { // 公共模块 抽离自己写的文件
    //       chunks: 'initial',
    //       minSize: 0, // 文件大小
    //       minChunks: 2 // 最小公用次数
    //     },
    //     vendor: { // 抽离第三方文件
    //       priority: 1, // 权重 先抽离
    //       test: /node_module/, // 直接使用 test 来做路径匹配 例如/react|angluar|lodash/
    //       chunks: 'initial',
    //       minSize: 0, // 文件大小
    //       minChunks: 2 // 最小公用次数
    //     }
    //   },
    // },
    // minimizer: [
    //   new TerserJSPlugin({}),
    //   new OptimizeCSSAssetsPlugin({
    //     assetNameRegExp: /\.optimize\.css$/g,
    //     cssProcessor: require('cssnano'),
    //     cssProcessorPluginOptions: {
    //       preset: ['default', { discardComments: { removeAll: true } }],
    //     },
    //     canPrint: true
    //   })
    // ],
  },
  mode: "development", // 模式选择： production-生产 development-开发 none
  entry: {
    // 多个入口文件·多页面应用
    index: "./src/index.js",
    other: './src/other.js'
  }, // 入口
  output: {
    // 出口
    filename: '[name].[hash:8].js', // 打包后输出文件的文件名 [hash: 8]-每次打包生成一个新的文件 以hash区分
    path: path.resolve("dist"), // 路径必须是绝对路径, 打包后的文件存放的地方 // https://blog.csdn.net/qq_31411389/article/details/53080544
    // “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    // publicPath: 'https://cdn.myfans.cc' // 输出解析文件的目录 公用的路径 调用资源的时候统一加上该路径
  },
  // 报错-调试
  // 1) 源码映射文件 会单独生成一个sourcemap文件 出错时会标识当前报错的行和列 特点是 大 和 全
  // devtool: 'source-map', // 增加映射文件 帮助调试源代码
  // 2） 不会产生新的文件 出错时会标识当前报错的行和列
  devtool: 'eval-source-map',
  // 3）不会产生列 但是是一盒单独的映射文件
  // devtool: 'cheap-module-source-map', // 产生后可以保留起来 用来调试
  // 4）不会产生文件和列 集成在打包后的文件中
  // devtool: 'cheap-module-eval-source-map',
  // watch: true,
  // watchOptions: {
  //   //监控的选项 时时打包
  //   poll: 1000, // 每秒监听的次数
  //   aggregateTimeout: 500, // 防抖 停止500m后重新run
  //   ignored: /node_modules/ // 不需要监听的文件
  // },
  devServer: {
    port: 9999, // 指定端口号
    hot: true, // 启用热更新
    open: true, // 重新打开页面 run
    progress: true,
    contentBase: "./dist",
    compress: true,
    // openPage: 'other.html' // 指定初次访问的页面
    // 1）代理 以重写的方式将请求代理到express服务器上 有毒（未成功）
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9999/', // 将 URL 中带有 /api 的请求代理到本地的 9999 端口的服务上
    //     pathRewrite: {
    //       '^/api': '' // 把 URL 中 path 部分的`api`移除掉
    //     }
    //   }
    // }
    // 2）模拟数据
    // before(app) {
    //   app.get('/api/name', (req, res) => {
    //     res.json({
    //       name: 'webpack'
    //     })
    //   })
    // }
    // 3) 有服务端 不用代理来处理 在服务端中启动webpack 端口用服务端端口
  },
  resolve: {
    // 解析第三方包 common
    modules: [path.resolve('node_modules')], // 从node_modules下找
    extensions: ['.css', '.js'], // 扩展名 依次解析 模块路径解析时, webpack 会尝试帮你补全那些后缀名来进行查找 
    // mainFields: [ 'style', 'main' ],
    // mainFiles: [], // 入口文件名字 index.js
    // alias: {
    //   // 别名 引入时使用 配置常用模块的相对路径
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // }
  },
  plugins: [
    // 数组 放着所有的webpack插件
    new webpack.NamedModulesPlugin(), // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin(), // 热更新插件 支持
    // new Happypack({
    //   id: 'css',
    //   use: [
    //     MiniCssExtractPlugin.loader, // 抽离成一个文件
    //     "css-loader",
    //     "postcss-loader",
    //   ]
    // }),
    // new Happypack({
    //   // 项目大时使用多线程 打包更快
    //   id: 'js',
    //   use: [{
    //     loader: "babel-loader",
    //     options: {
    //       // 用babel-loader 需要把 es6 -> es5
    //       presets: [
    //         "@babel/preset-env",
    //         '@babel/preset-react'
    //       ],
    //       plugins: [
    //         ["@babel/plugin-proposal-decorators", { "legacy": true }],
    //         ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    //         "@babel/plugin-transform-runtime"
    //       ]
    //     }
    //   }]
    // }),
    // new webpack.DllReferencePlugin({
    //   // 动态链接库
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json') // 300k -> 8k react react-dom 不在打包
    // }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略moment语言包 #21#
    new webpack.DefinePlugin({
      // 定义环境变量
      DEV: JSON.stringify('dev'), //"'dev'"
      FLAG: 'true',
      NUM: '1+1'
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模版文件的路径
      filename: "index.html", // 输出html文件名
      minify: {
        // 压缩配置
        removeAttributeQuotes: false, // 删除引号
        collapseWhitespace: false // 压缩成一行
      },
      chunks: ['index'], // chunk 指定了该模板导入的模块，在多页面的配置中，可以在该属性中配置多个入口中的一个或者多个脚本文件
      hash: true // 打包件文加上hash后缀
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "other.html",
      chunks: ['other'],
      hash: true 
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.[hash:8].css",
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   { from: 'doc', to: './dist' }
    // ]),
    new webpack.BannerPlugin('created by wujianwei')
    // new webpack.ProvidePlugin({
    //   // 在每个模块中都注入$
    //   $: "jquery"
    // })
  ],
  // externals: {
  //   // externals配置的作用： 引用一个库 不让webpack打包 并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用
  //   jquery: "jQuery"
  // },
  module: {
    // noParse: /jquery/, // 不去解析jquery中的依赖库 first 优化项
    // 模块
    // loader的顺序： 默认是从右向左执行 从下到上执行
    rules: [
      {
        test: /\.html$/, // html中img标签src图片打包
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/, // js中使用的src
        // use: 'file-loader'
        // url-loader
        // 做一个限制 当图片小于多少k时 用base64转化 否则用file-loader产生真实的图片
        // base64 不会http请求 但会比原文件大1/3
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: 'img/',
            // publicPath: 'https://cdn.myfans.cc'
          }
        }
      },
      // {
      //   test: require.resolve("jquery"),
      //   use: "expose-loader?$"
      // },
      {
        test: /\.js$/,
        use: {
          loader: "eslint-loader",
          options: {
            enforce: "pre" // loader类型 previous 前置loader post-后置loader  内联loader normal-普通loader
          }
        },
        exclude: /node_modules/ // 排除node_modules下的js
        // enforce: "pre",
        // test: /\.js$/,
        // exclude: /node_modules/,
        // loader: "eslint-loader"
      },
      // 规则
      {
        test: /\.js$/, // normal 普通loader
        include: path.resolve("src"), // 查找当前目录下的js(包括) path.resolve(__dirname, "src")
        exclude: /node_modules/, // 排除node_modules下的js
        // use: 'Happypack/loader?id=js'
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-loader 需要把 es6 -> es5
            presets: [
              "@babel/preset-env",
              '@babel/preset-react'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime",
              // "dynamic-import-webpack",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      },
      // css-loader 解析@important以及路径
      // style-loader 将css插入到模版中的head标签
      // loader 特点：功能单一 (组合使用)
      // loader用法 一个loader用字符串 多个loader需要[] 也可写成 对象方式
      
      {
        test: /\.css$/,
        // use: 'Happypack/loader?id=css'
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "bottom" // 生成style标签插入至顶部
          //   }
          // },
          MiniCssExtractPlugin.loader, // 抽离成一个文件
          "css-loader",
          "postcss-loader",
        ]
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "bottom" // 生成style标签插入至顶部
          //   }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader" // less -> css 
        ]
      }
    ]
  }
}
// export default module;