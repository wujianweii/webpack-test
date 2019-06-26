// webpack - node编写
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到单独的文件中
// const TerserJSPlugin = require('terser-webpack-plugin'); // js压缩
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
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
  devServer: {
    // 开发服务器配置
    port: 8102,
    progress: true,
    contentBase: "./build",
    compress: true
  },
  mode: "development", // 模式选择： production-生产 development-开发 none
  entry: "./src/index.js", // 入口
  output: {
    // 出口
    filename: 'bundle.[hash:8].js', // 打包后的文件名 [hash: 8]-每次打包生成一个新的文件 以hash区分
    path: path.resolve(__dirname, "build")// 路径必须是绝对路径
  },
  plugins: [
    // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模版
      filename: "index.html", // 输出文件名
      minify: {
        // 压缩配置
        removeAttributeQuotes: true, // 删除引号
        collapseWhitespace: false // 压缩成一行
      },
      hash: true // 打包文件加上hash后缀
    }),
    new MiniCssExtractPlugin({
      filename: "main.[hash:8].css",
    })
  ],
  module: {
    // 模块
    // loader的顺序： 默认是从右向左执行 从下到上执行
    rules: [
      // {
      //   // test: /\.js$/,
      //   // use: {
      //   //   loader: "eslint-loader",
      //   //   options: {
      //   //     enforce: "pre" // previous 前置执行 post-滞后执行
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