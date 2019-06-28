require("./index.css");
import './styles/a';
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




// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/name', true);
// xhr.onload = function() {
//   $('body').prepend('<h2>' + JSON.parse(xhr.response).name + '</h2>');
// }
// xhr.send();



let url = '';
if (DEV === 'dev') {
  url= "http://localhost:9999";
} else {
  url= "http://cdn.myfans.cc";
}
console.log(url);
console.log(FLAG);
console.log(NUM);


import moment from 'moment';
// 设置语言
// 忽略语言包后 手动引入所需要的语言
// import 'moment/local/zh-cn';
moment.locale('zh-cn');
const time = moment().endOf('day').fromNow();
console.log(time);