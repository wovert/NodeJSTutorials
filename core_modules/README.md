## querystring模块
- `require('querystring').parse('a=1&b=2')` {a:'1',b:'2'}

## http模块
http.createServer((req,res)=>{
	if(req.url == '/favicon.ico')  return;
	res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'})
	//res.statusCode = 200;
	//res.setHeader('Content-Type','text/html;charset=UTF-8')

	res.end()
})
.listen(port,hostname,()=>{})`

### request对象
- req.url
	+ /page.html?param=value&param=value&...
- POST数据接收
	+ req.on('data',(data)=>{}) 一段数据到达（很多次执行）
	+ req.on('end',(data)=>{}) 数据全部达到（一次）

### chrome
	+ req.url默认显示/favicon.ico
	+ <link rel="shortcut icon" href="/favicon.ico" />
### response对象
- res.write()
- res.end() 执行这条语句之前浏览器不会响应给客户端

## fs模块
异步调用：readFile()
同步调用：var code = readFileSync()

- 读文件没有指定编码默认读取的是Buffer(缓冲区)

### 缓冲区
- 内存中操作数据的容器
- 通过缓冲区可以方便的操作二进制数据
- 大文件操作时必须有缓冲区

fs.readFile(文件名,utf8,(err,data)=>{})
	data.toString()
fs.writeFile(file, content, handler)
fs.readdir(filePath, (err,data)=>{
	data是所有文件或目录
})

- stat判断是否是文件或目录
fs.stat(filePath,(err,stats)=>{ 
	stats.isDirectory()
})

fs.readFile('./1.jpg', (err,data)=>{
	res.writeHead(200, {'Content-type':'image/jpg'})
})

fs.readFile('./index.css', (err,data)=>{
	res.writeHead(200, {'Content-type':'text/css'})
})

## url模块
- obj = url.parse(IP/?a=1&b=2)
	+ protocol: 'http:',
 	+ slashes: true,
 	+ auth: username,
	+ host: domain.name
	+ port: 80 or null,
	+ hostname: domain.name:80
	+ hash: null,
	+ search: ?a=1&b=2
	+ query: a=1&b=2
	+ pathName: /index.html
	+ path: '/index.html?a=1&b=2'
	+ href: 'http://domain/index.html?a=1&b=2'
- obj = url.parse(IP/?a=1&b=2, true)
	+ obj.query： {a:'1',b:'2'}

## 模块化
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

## 自定义模块
1. 模块组成
2. npm
3. 发布模块

// require 请求：引入模块
// module 模块：批量输出
// exports 单个输出一个

### require
- require(module[.js])
	+ module[.js] ：核心模块
	+ ./module[.js]：自定义模块

### exports
- 自动添加一块代码到模块中
(function(require,exports,module){
	var a = 12;
	var b = 5;
	exports.a = 12;
})();

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

## require引入json文件
- xx.json
	+ {"name":"value"}
- const json = requrie('XX.json');

## 引用文件夹模块
- require('文件夹名')
- node_modules/bar
	+ app.js
	+ package.json
		{
			name:'模块名',
			version: '1.0.0',
			main: 'app.js'
		}

## require引入规则

优先级：核心模块 < 文件模块

0. 缓存中查找模块
	+ require.cache记录了所以缓存对象
	+ 如何实现缓存
		* 
	+ 如何删除缓存
		* delete require.cache[filename];
		* Object.keys(require.cache).forEach((key)=>{delete require.cache[key];})
			{file: Module{...}}


1. 载入核心模块： **文件名**
	+ 

2. node_module目录: **文件名**
	+ node_module递归向上目录查找
	+ xx.js


3. 载入文件模块：**./文件名** or **./目录名**

	+ 载入文件优先级：js < json < node
		1. 载入js模块
		2. 没有js模块，则载入json对象(用于配置文件)
		3. 载入node文件(C++编译的文件)

	+ 载入模块优先级：package.json < index.js
		4. package.json文件的main属性指向的文件
		5. 查找index.js文件加载

### npm
> NodeJS Package Manager

1. 统一下载途径
2. 自动下载依赖

$ npm install|uninstall|update MODULE_NAME[@version]
- npm下载的模块目录：`node_modules`： 

- ./ 自定义模块导入
- 不加./ 必须放在node_modules里面


#### npm 管理
- 查看本项目模块
$ npm list

- 在本项目安装模块
$ npm install mysql

- 在本项目卸载模块
$ npm uninstall mysql

- 升级本项目模块
$ npm update mysql

- 查看当前项目模块根目录
$ npm root

- 查看全局环境模块根目录
$ npm root -g


### require
1. 如果有./时从当前目录找
2. 如果没有./
	+ 先从系统模块
	+ 找不着，再从node_modules找

- 自定义模块都放入node_modules里面

1. 模块里面
	+ require-引入
	+ exports - 输出
	+ module.exports - 批量输出
2. npm
	+ 自动下载依赖模块
3. node_modules
	+ 模块放入此目录 

[npmjs](https://www.npmjs.com)

1.登录npm
`$ npm login`
`$ npm whoami`

2.配置模块
- 生成package.json模块包配置文件
`$ npm init`
	name,version,description,entry point,test command,git repository,keywords(空格分割),	author,license(ISC)

3.提交模块
- 发布命令
`$ npm publish` 

- 修改模块，再次发布并修改版本号
`$ npm install MODULE_NAME`
`$ npm publish`

- 升级模块
`$ npm update MODULE_NAME`

- 删除第二版本(npmjs也是), **修改package.json的version**
`$ npm --force unpublish` 
`$ npm --force unpublish` 
- 包不能随便删除

1. npm init
2. npm publish
3. npm --force unpublish


## buffer模块
- new Buffer(byte)

- 大端，小端
- BE 用于网络传输
- LE 
图片转换为Base64编码
data.toString('base64|utf8|binary|hex|ascii')
data:image/png;base64,编码内容

Data URI协议

## 文件编码
- windows是默认GBK编码
- Buffer.isEncoding('gbk') // false
readFile(
	data.toString('')
)

**iconv-lite**模块(编码转换库)

iconv.decode(data, 'gbk')


## 遇到问题
1. 自己解决
2. 整理需求
3. 抽象几个关键词
4. google
5. stackoverflow

# Express

## 1.setup
`$ npm install -g cnpm --registry=https://registry.npm.taobao.org`
`$ cnpm install express`


- Windows: NodeJS 安装的目录下 node_modules
pm\.npmrc
`registry=https://registry.npm.taobao.org`



- 王小云破解MD5
- npm配置
`npm config ls`
use-agent - ""
;userconfig
cache=nvm\npm-cache 缓存目录
prefix=nvm\nvm
registry

`npm config set prefix c:\node\nvm\npm`
`npm config get prefix`

环境配置
NVM_HOME=c:\node\nvm
NPM_HOME=%NVM_HOME%\npm
PATH=

http://npm.taogao.org

NRM：Node Registry Manager
> npm install -g nrm
> nrm ls 全球所有镜像源
> nrm use cnpm 使用镜像源

> npm config ls
> nrm ls
> nrm use taobao

npm config
npm init
npm search
npm info
npm list 包依赖性
npm install
npm uninstall
npm outdated 有没有包更新
	"webpack-dev-server": "^2.9.7" 9manual版本号
	"webpack-dev-server": "~2.9.7" 7修订版本号
	"webpack-dev-server": "*" 最新版本号

npm update
npm run 运行package.json
npm cache ls
npm cache clean 缓存清空

## path模块
`path.join(__dirname,file)`
path.basename(f[,ext]) 文件名, ext去掉文件名后缀
path.delimiter  	获取OS路径分隔符
	window: ;
	Linux: :
process.env.PATH.split(path.delimiter)
path.dirname()
path.extname()
path.format() 路径对象转换成字符串

path.isAbsolute(file)
path.normalize('C:/dev\\\abc//cba\\1.txt') 正常化路径
path.relative(from,to)
	获取to相对于from的相对路径

path.resolve([from ...], to) 
	与join类似
	不同点是：c:/dev 切换到目录
path.sep
	OS默认路径分隔符
	windwo: \
	Linux: /

path.win32 
	允许在任意OS上使用windows方式操作路径
path.posix
	允许在任意OS上使用Linux的方式操作路径

## readline模块
- 读取大文本文件，一行一行的读取

## fs-extra(第三方)

## 2.使用express 
`const express=require('express')`
`var server = express()`

- 处理请求
`server.use('/a.html', (req,res) => {`
`	res.write(string|buffer)`
`	res.send(string|buffer|json)`
`	res.end()`
`})`
- 监听
`server.listen(3001)`

- express保留了原生的功能，扩展了方法send()增强其功能

## 3种处理请求方法
- server.get('/',handler)
- server.post('/',handler)
- server.use('/',handler) // post or get

## 插件或中间件 express-static
`$ cnpm server express-static` 
`$ cnpm server body-parser` 

- 读取静态文件
`server.use(expressStatic('./www'))`

- 读取GET数据
`req.query` 是GET数组

- 读取POST数据
	server.use(bodyParser.urlencode({
		extended:true, 		// 扩展模式
		limit:2*1024*1024	// 限制接受数据,2M, 默认100k
	}));
	server.use('/',(req,res)=>{
		req.body // post
		req.query // get
	})

- GET: 无需中间件
- POST： 需要body-parser

## formidable, 表单中间件
// import
http,formidable,util,fs,path,silly-datetime;

var form = new formidable.IncomingForm();
form.uploadDir = './uploads';
from.pasre(req, (err,fields,filesfiels)=>{
	console.log(fiedls);
	console.log(file);
	
	var t = sd.format(new Date(),'YYYYMMDDHHmm');
	var r = parseInt(Math.random()*89999 + 10000);
	var ext = path.extname(fiel.tupina.name);
	var f = t+r+extname;

	var oldpath = path.join(__dirname,files.tupian.path);
	var newpath = path.join(__dirname,'uploads', f)；
	fs.rename(oldpath,newpath,(err){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end();
	})
	
	res.end(util.inspect({fields: fields, files:files}));


})
form.on('progress',handler);

## 链式操作
server.use('/',(req,res,next)=>{
	console.log('a');
	next();
})
server.use('/',(req,res,next)=>{
	console.log('b');
	next();
})


## 编写中间件
- my-body.parser.js
	const qs = require('querystring')
	module.exports = {
		urlencoded: (params={}) => {
			return (req, res, next) => { 
				var str = '';
				req.on('data', (data)=>{
					str += data;
				})
				req.on('end', ()=>{
					console.log(params.a)
					console.log(params.b)
					req.body = qs.parse(str)
					next();
				})
			}
		}
	}

- 引用my-body-parser.js
	const myBodyParser = require('./my-body-parser')
	server.use(myBodyParser.urlencoded({a:1,b:2}))
	server.use('/', (req,res) => {
		console.log(req.body);
	})

# 迭代器:同步
(function iterator(i){
	if XXX return ;
	..... iterator(i);
})(0);

# cookie与session
- http：无状态的
- cookie: 在浏览器保存一些数据，每次请求都会带过来
	+ 不安全
	+ 有限4KB
	+ 校验cookie是否被篡改过

- session：保存数据，保存于服务器。
	+ 安全
	+ 无限
	+ 基于cookie实现的
		* cookie中有一个session的ID，服务器利用sessionid找到sessionw文件、读取、写入
	+ 隐患：session劫持
		* 解决：cookie加密

## cookie

- cookie
	+ 空间小
	+ 安全性差
+ 解决：
	+ 精打细算
	+ 校验 cookie 是否被串改过

### 1.添加(发送)cookie
- res.cookie(name,value,{path:'/', maxAge: 毫秒, signed: true|false})
	+ 父目录能读取子目录cookie
	+ signed 是否需要签名
		* 签名设置：req.secret = "abc123"

### 2.读取cookie
- 读取未签名 cookie
	+ server.use(cookieParser())
	+ req.cookies['user']

- 读取签名 cookie
	+ server.use(cookieParser('签名')), 签名是 req.secret 设置的
	+ req.signedCookies

### 3.删除 cookie
- res.clearCookie('名字')

### 4.加密 cookie
- const secretKey = "sbdnl29s93"
- 签名：server.use(cookieParser(secretKey)) 防止串改
- 加密：server.use(cookieEncrypter(secretKey)) 


## session
- session 不能独立存在，给予 cookie 存在
const cs = require('cookie-session')

- 提示：Eror keys. : 必须加密

### 1.多个密钥设置
// 必须添加
server.use(cookieParser(签名字符串)); 
server.use(cookieSession({
	// 客户端 cookie 显示的名字
	name:'sess
	', 
	// 签名 轮询使用
	keys ： ['aaa','bbb','ccc'], 
	
	maxAge: 毫秒 // session 有效期， PHP 默认 20 分钟有效期
		maxAge 越长越容易 session 劫持
}));
循环利用 server.keys 中的密钥，第一次使用 aaa，第二次使用 ccc 等

- 推荐代码
for(var i=0; i<100000; i++){
	arr.push('sig_' + Math.random());
}
keys: arr


### 2.写入 session
- req.session
if (req.session['count'] == null) {
	req.session['count'] = 1;
} else {
	req.session['count']++;	
}

### 3.读取 session
- 客户端
	+ sesion sdlfkjsldkjfkls 是sessionid
	+ session.sig 对上面sessionid进行签名保护
	再次刷新 sessionid 不变（sdlfkjsldkjfkls是sessionid）
	签名 session.sig 值得变了(keys:[....]循环利用)

- 服务器端
	+ req.session['session 名字']

### 4. 删除 session
- delete req.session['name']

- server.use(cookieParser(签名字符串)) 是指签名是，req.secret不用设置,他会自动设置


## 代码实现
`$ cnpm i express express-static cookie-parser cookie-session`
1. 发送——cookie-parser
server.use(cookieParser('skk23ks023ks'))
server.use('/aaa/a.html',(req,res)=>{
	res.secret='skk23ks023ks'; // 在这而不用签名 
	res.cookie('user','blue',{
		signed:true,
		path:'/aaa',
		maxAge:30*24*3600*1000});
	res.send('OK');
})