console.log("webpack-test1");

require("./index.css");
require("./a.js");

class A {
  a = 1;
}
const a = new A();
console.log(a.a);