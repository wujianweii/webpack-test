// import React from 'react';
// import { render } from 'react-dom';

// render(<h2>webpack</h2>, window.root);



require("./index.css");
import './styles/a';
// // require("./a.js");

// // class A {
// //   a = 1;
// // }
// // const a = new A();
// // console.log(a.a);


// // import $ from "expose-loader?$!jquery";
import $ from "jquery";
// // expose-loader 暴露loader
// // console.log(window.$);
// // 引入第三方模块
// // 1） expose-loader 暴露到window上
// // 2） providePlugin 在每个模块中都注入$  
// // 3） 引入cdn地址


// // webpack打包图片
// // 1) 在js中创建图片引入
// // file-loader 默认会在内部生成一张图片到build目录下
// // 把生成的图片名字返回回来
import logo from './assets/example.png';
let img = new Image();
img.src = logo;
img.style.width = '200px';
$('body').prepend(img);




// // let xhr = new XMLHttpRequest();
// // xhr.open('GET', '/api/name', true);
// // xhr.onload = function() {
// //   $('body').prepend('<h2>' + JSON.parse(xhr.response).name + '</h2>');
// // }
// // xhr.send();


// 定义环境变量 webpack.DefinePlugin
// let url = '';
// if (DEV === 'dev') {
//   url= "http://localhost:9999";
// } else {
//   url= "http://cdn.myfans.cc";
// }
// console.log(url);
// console.log(FLAG);
// console.log(NUM);


// import moment from 'moment';
// // 设置语言
// // 忽略语言包后 手动引入所需要的语言
// // import 'moment/local/zh-cn';
// moment.locale('zh-cn');
// const time = moment().endOf('day').fromNow();
// console.log(time);


// import 在###生产环境下 会自动去除没用的代码
// import calc from './test'
// ###tree-shaking### 把没用到的代码自动删除掉
// console.log(calc.sum(1,2))

// require
// es6 模块会把结果放在default上
// 不会把没用到的代码自动删除掉
// console.log(calc.default.sum(1,2))

// ###scope hosting### 作用域提升
// let a = 1;
// let b = 2;
// let c = 3;
// let d = a + b + c; // 生产环境下 在webpack中自动省略 一些可以简化的代码
// console.log(d, '-----------');


// ##25
// import './a';
// import './b';
// console.log('index.js')


// 懒加载 vue react -> import语法实现
// let button = document.createElement('button');
// button.innerHTML = 'click';
// button.addEventListener('click', function() {
//   // console.log('click');
//   // es6 草案中的语法 jsonp实现动态加载文件
//   import('./test.js').then(data => {
//     console.log(data.default);
//   })
// });
// $('body').prepend(button);

// 热更新
import test from './test.js';
console.log("test", test);
if (module.hot) {
  module.hot.accept('./test', () => {
    let str = require('./test');
    console.log("str", str.default);
  })
}