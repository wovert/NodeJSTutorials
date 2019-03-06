// define 声明模块 通过require使用一个模块
let factories = {}
// 模块的名字 依赖 工厂函数
function define(m, dependencies, factory) {
  factory.dependencies = dependencies // 将依赖记到factory上
  factories[m] = factory
}

function require(mods, callback) {
  let result = mods.map(function(m) { // name, age
    let factory = factories[m]
    let exports
    let dependencies = factory.dependencies // ['name']
    // require(['name', ...], function(){})
    require(dependencies, function() {
      exports = factory.apply(null, arguments)
    }) // ['沃尔特18']
    return exports
  })
  callback.apply(null, result)
}

define('name', [], function() {
  return '沃尔特'
})

define('age', ['name'], function(name){
  return name + 18
})

require(['age'], function(age){
  console.log('age=', age)
})