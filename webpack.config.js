// webpack - node编写
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到单独的文件中
// const TerserJSPlugin = require('terser-webpack-plugin'); // js压缩
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩

// 插件
// 1）CleanWebpackPlugin // 打包前删除原打包文件
// 2) CopyWebpackPlugin // 打包时将别的文件打包(拷贝文件)
// 3) BannerPlugin 内置 版权声明 给每个js加上字符串
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
module.exports = {
  optimization: {
    // 优化项
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
  mode: "production", // 模式选择： production-生产 development-开发 none
  entry: {
    // 多个入口文件·多页面应用
    index: "./src/index.js",
    // other: './src/other.js'
  }, // 入口
  // 报错-调试
  // 1) 源码映射文件 会单独生成一个sourcemap文件 出错时会标识当前报错的行和列 特点是 大 和 全
  // devtool: 'source-map', // 增加映射文件 帮助调试源代码
  // 2） 不会产生新的文件 出错时会标识当前报错的行和列
  // devtool: 'eval-source-map',
  // 3）不会产生列 但是是一盒单独的映射文件
  // devtool: 'cheap-module-source-map', // 产生后可以保留起来 用来调试
  // 4）不会产生文件和列 集成在打包后的文件中
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  watchOptions: {
    //监控的选项 时时打包
    poll: 1000, // 每秒监听的次数
    aggregateTimeout: 500, // 防抖 停止500m后重新run
    ignored: /node_modules/ // 不需要监听的文件
  },
  devServer: {
    port: 9999,
    progress: true,
    contentBase: "./build",
    compress: true,
    // 1）代理 以重写的方式将请求代理到express服务器上 有毒
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9999/',
    //     pathRewrite: {
    //       '^/api': ''
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
  output: {
    // 出口
    filename: '[name].[hash:8].js', // 打包后的文件名 [hash: 8]-每次打包生成一个新的文件 以hash区分
    path: path.resolve(__dirname, "build"), // 路径必须是绝对路径,
    // publicPath: 'https://cdn.myfans.cc' // 公用的路径 调用资源的时候统一加上该路径
  },
  resolve: {
    // 解析第三方包 common
    modules: [path.resolve('node_modules')], // 从node_modules下找
    extensions: ['.css', '.js'], // 扩展名 依次解析
    // mainFields: [ 'style', 'main' ],
    // mainFiles: [], // 入口文件名字 index.js
    // alias: {
    //   // 别名 引入时使用
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // }
  },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略moment语言包 #21#
    new webpack.DefinePlugin({
      // 定义环境变量
      DEV: JSON.stringify('dev'), //"'dev'"
      FLAG: 'true',
      NUM: '1+1'
    }),
    // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模版
      filename: "index.html", // 输出文件名
      minify: {
        // 压缩配置
        removeAttributeQuotes: true, // 删除引号
        collapseWhitespace: false // 压缩成一行
      },
      chunks: ['index'],
      hash: true // 打包件文加上hash后缀
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html", // 模版
    //   filename: "other.html", // 输出文件名
    //   chunks: ['other'],
    //   hash: true // 打包文件加上hash后缀
    // }),
    new MiniCssExtractPlugin({
      filename: "css/main.[hash:8].css",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'doc', to: './dist' }
    ]),
    new webpack.BannerPlugin('made in wujianwei')
    // new webpack.ProvidePlugin({
    //   // 在每个模块中都注入$
    //   $: "jquery"
    // })
  ],
  externals: {
    jquery: "jQuery"
  },
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
      // {
      //   // test: /\.js$/,
      //   // use: {
      //   //   loader: "eslint-loader",
      //   //   options: {
      //   //     enforce: "pre" // loader类型 previous 前置loader post-后置loader  内联loader normal-普通loader
      //   //   }
      //   // },
      //   // exclude: /node_modules/ // 排除node_modules下的js
      //   enforce: "pre",
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader"
      // },
      // 规则
      {
        test: /\.js$/, // normal 普通loader
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-loader 需要把 es6 -> es5
            presets: [
              "@babel/preset-env"
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, "src"), // 查找当前目录下的js(包括)
        exclude: /node_modules/ // 排除node_modules下的js
      },
      // css-loader 解析@important以及路径
      // style-loader 将css插入到模版中的head标签
      // loader 特点：功能单一 (组合使用)
      // loader用法 一个loader用字符串 多个loader需要[] 也可写成 对象方式
      
      {
        test: /\.css$/,
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