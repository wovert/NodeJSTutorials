// require 引入模块
// module 批量输出模块
// exports 输出模块

//(function(require, exports, module){
var a = 100
var b = 200

// exports.a = a
// exports.b = b

console.log(exports === module.exports)
// module.exports 初始值为一个空对象 {}
// exports 是指向的 module.exports 的引用
// require() 返回的是 module.exports 而不是 exports

// module作用：批量输出
module.exports = {
  // a: a,
  // b: b,
  a,
  b
}

//})