let fs = require('fs')
function req(m) {
  // 文件内容
  let content = fs.readFileSync(m, 'utf8')
  // 最后一个参数是函数的内容体
  let fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports')
  let module = {
    exports: {}
  }
  return fn(module.exports, module, req, __dirname, __dirname)
}
let str = req('./a.js')
console.log(str)
/*
  function(exports, module, require, __dirname, __filename) {
    module.exports = '导出内容'
    return module.exports
  }
*/