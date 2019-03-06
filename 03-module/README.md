# Node 模块

## 模块化

> 一个复杂的系统分解到多个模块以便编码

- 系统模块
- 自定义模块，第三方模块
- 文件模块
- 包管理器

## 系统模块

- assert(Stability: 3-Locked) (Locked：不改变)
- Buffer (Stability: 2-Stable)
- C/C++ Addons(扩展)
- Child Processes
- Cluster
- Command Line Options
- Console
- Crypto 加密
- Debugger
- DNS(域名解析)
- Domain：0-Deprecated
- Error：各种异常
- Events 事件
- File System
- Globals
- HTTP
- HTTPS
- Modules
- Net 网络操作
- OS 操作系统信息
- Path 处理文件路径
- Process
- Punycode：0-Deprecated
- Readline
- REPL: node命令行
- Stream 流操作
- StringDecoder
- Timers 定时器
- TLS/SSL
- TTY
- UDP/Datagram
- URL 
- Util 工具
- V8
- VM(虚拟机)
- ZLIB 压缩

### 命名空间

> 开发网页要通过命名空间的方式来组织代码

- 命名空间冲突，两个库可能会使用同一个名称
- 无法合理的管理项目的依赖和版本
- 无法方便的控制依赖的加载顺序

### CommonJS

- JavaScript模块化规范，核心思想是`require`方法来同步地加载依赖的其他模块，通过`module.exports`导出需要暴露的接口

```js
- a.js
module.exports = "导出内容"

- b.js
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
```

### AMD

> 与CommonJS最大不同在于它采用异步的方式加载依赖的模块。AMD规范主要为了解决针对浏览器环境的模块化问题，最具代表性的实现是 require.js

#### ADM 有点

- 可在不转换代码的情况下直接在浏览器中运行
- 可加载多个依赖
- 代码可运行在浏览器环境和Node.js环境下

#### ADM 缺点

- JS运行环境没有原生支持AMD，需要先导入实现了AMD的库后才能正常使用

```js
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
```

### ES6 模块

> `ECMA` 提出的`JavaScript`模块化规范，它在语言的层面上实现了模块化。浏览器厂商和NodeJS都宣布要支持该规范。它将逐渐取代`CommonJS`和`AMD`，成为浏览器和服务器通用的模块接解决方案。

采用ES6模块化导入及导出是

```js
// 导入
import { name } from './person.js'

// 导出
export const name = 'wovert'
```

ES6模块虽然是终极模块化方案，但他它的缺点在于目前无法运行在大部分JavaScript运行环境下，必须通过工具转换成标准的`ES5` 后才能正常工作

## url模块

- `obj = url.parse(IP/?a=1&b=2)`
  - protocol: http:,
  - slashes: true,
  - auth: username,
  - host: domain.name
  - port: 80 or null,
  - hostname: domain.name:80
  - hash: null,
  - search: ?a=1&b=2
  - query: a=1&b=2
  - pathName: /index.html
  - path: '/index.html?a=1&b=2'
  - href: 'http://domain/index.html?a=1&b=2'
- `obj = url.parse(IP/?a=1&b=2, true)`
  - `obj.query： {a:'1',b:'2'}`

## 自定义模块

1. 模块组成
2. npm
3. 发布模块

```js
// require 请求：引入模块
// module 模块：批量输出
// exports 单个输出一个
```

### require

- require(module[.js])
  - module[.js] ：核心模块
  - ./module[.js]：自定义模块

### exports

- 自动添加一块代码到模块中

```js
(function(require,exports,module){
  var a = 12;
  var b = 5;
  exports.a = 12;
})();
```

```js
exports.a = 1;
exports.b = 2;
exports.c = 3;
// 批量输出：错误
exports = {
  a: 1,
  b: 2,
  c: 3
}
// 批量输出：正确
module.exports = {
  a: 1,
  b: 2,
  c: 3
}
// true
module.exports == exports
```

## require引入json文件

- xx.json
  - `{"name":"value"}`
- `const json = requrie('XX.json');`

## 引用文件夹模块

- require('文件夹名')
- node_modules/bar

```js
package.json
{
  name:'模块名',
  version: '1.0.0',
  main: 'app.js'
}
```

## require引入规则

优先级：核心模块 < 文件模块

0. 缓存中查找模块
  - require.cache记录了所以缓存对象
  - 如何实现缓存
  - 如何删除缓存
    - delete require.cache[filename];
    - Object.keys(require.cache).forEach((key)=>{delete require.cache[key];})
			{file: Module{...}}
1. 载入核心模块： **文件名**
2. node_module目录: **文件名**
  - node_module递归向上目录查找
  - xx.js
3. 载入文件模块：**./文件名** or **./目录名**
  - 载入文件优先级：js < json < node
	  - 1. 载入js模块
	  - 2. 没有js模块，则载入json对象(用于配置文件)
	  - 3. 载入node文件(C++编译的文件)

  - 载入模块优先级：package.json < index.js
	  - 4. package.json文件的main属性指向的文件
	  - 5. 查找index.js文件加载

### npm

> NodeJS Package Manager

1. 统一下载途径
2. 自动下载依赖

`$ npm install|uninstall|update MODULE_NAME[@version|@next]`

- npm下载的模块目录：`node_modules`： 

- ./ 自定义模块导入
- 不加./ 必须放在node_modules里面

#### npm 管理

- 查看本项目模块
`$ npm list`

- 在本项目安装模块
`$ npm install mysql`

- 在本项目卸载模块
`$ npm uninstall mysql`

- 升级本项目模块
`$ npm update mysql`

- 查看当前项目模块根目录
`$ npm root`

- 查看全局环境模块根目录
`$ npm root -g`

### require方法

1. 如果有./时从当前目录找
2. 如果没有./
  - 先从系统模块
  - 找不着，再从node_modules找
  - 自定义模块都放入node_modules里面
1. 模块里面
  - require-引入
  - exports - 输出
  - module.exports - 批量输出
2. npm
  - 自动下载依赖模块
3. node_modules
  - 模块放入此目录

[npmjs](https://www.npmjs.com)

1. 登录 `npm`
`$ npm login`
`$ npm whoami`
2. 配置模块
- 生成 `package.json` 模块包配置文件
`$ npm init`
	name,version,description,entry point,test command,git repository,keywords(空格分割),	author,license(ISC)
3. 提交模块
- 发布命令
`$ npm publish` 

- 修改模块，再次发布并修改版本号
`$ npm install MODULE_NAME`
`$ npm publish`

- 升级模块
`$ npm update MODULE_NAME`

- 删除第二版本(npmjs也是), **修改 package.json 的 version**
`$ npm --force unpublish`
`$ npm --force unpublish`
- 包不能随便删除

1. npm init
2. npm publish
3. npm --force unpublish

### npm包发布问题及解决

1. 使用 cnpm 的注意报错：`no_perms Private mode enable, only admin can publish this module`
`npm config set registry http://registry.npmjs.org` 
2. npm 包 package.json中registory属性一定要填写，每次publish npm时package.json中version版本一定要大于上一次。
3. npm publish failed put 500  unexpected status code 401这样的报错信息，往往是没有登录成功，操作npm login

## buffer模块

- new Buffer(byte)
- 大端，小端
- BE 用于网络传输
- LE
- 图片转换为Base64编码
  - `data.toString('base64|utf8|binary|hex|ascii')`
  - `data:image/png;base64`,编码内容
- Data URI协议

## 文件编码

- windows 是默认 `GBK` 编码
- `Buffer.isEncoding('gbk')` // false

```js
readFile(
  data.toString('')
)
```

**iconv-lite**模块(编码转换库)
`iconv.decode(data, 'gbk')`

## 遇到问题

1. 自己解决
2. 整理需求
3. 抽象几个关键词
4. google
5. stackoverflow