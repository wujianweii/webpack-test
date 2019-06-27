require("./index.css");
// require("./a.js");

// class A {
//   a = 1;
// }
// const a = new A();
// console.log(a.a);


// import $ from "expose-loader?$!jquery";
// import $ from "jquery";
// expose-loader 暴露loader
// console.log(window.$);
// 引入第三方模块
// 1） expose-loader 暴露到window上
// 2） providePlugin 在每个模块中都注入$  
// 3） 引入cdn地址


// webpack打包图片
// 1) 在js中创建图片引入
// file-loader 默认会在内部生成一张图片到build目录下
// 把生成的图片名字返回回来
import logo from './assets/example.png';
let img = new Image();
img.src = logo;
img.style.width = '200px';
$('body').prepend(img);