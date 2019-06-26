class B {

}

function * gen() {
  yield 233;
}

console.log(gen().next());

console.log("a.js");