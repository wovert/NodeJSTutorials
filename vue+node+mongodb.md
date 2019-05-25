# Vue+Node+MongoDB全栈开发
- 小程序 			数据交互	
- 公众号消息 		网页渲染		后台
- 公众号网页(4次/月) 后端接口
- 订阅号(1次/日)		用户授权
- 自适应Web网页 	

## Vue SSR
- 服务器直接渲染网页，返回给前段，来各种搜索引擎爬虫，可以正常的识别出网页的内容。
- 同时彻底扫荡微信全家桶
	+ 微信公众号接入
	+ 微信网页应用
	+ 网站PC端后台
- 利用Node和Vue SSR 一站式解决

## 前后端数据接口,Koa和装饰器Decorator来深度的抽象分层，不仅仅是Resfull 设计接口，小程序直接进阶到GraphQL数据交互的方案

- 小程序开发的项目结构改造成Vue模版搭建方案，无论是开发PC或微信网页还是小程序我们使用Vue

- 无论是输出渲染的页面，还是输出页面的接口，还是输出GraphQL的接口能力，都是靠Node、Coa 和 MongoDB 一站式构建。最贴心的事儿，除了开发阶段的整个项目布置，还有服务器配置仓库部署 以及 最终的 PM2一键部署

## 项目基础:SSR部署
- Webpack, Less, Coa, Nginx, NodeJS, MongoDB, Vue

## 项目基础
- Node经验
- 前段开发工程师
- 全栈开发者
- Vue SSR开发者

# 1. 申请认证公众号和小程序
- 服务号（支付功能）
- 小程序（支付功能）

## 注册服务号
1. 基本信息
- 邮箱：
- 密码：
- 确认密码：
- 验证码：

2. 邮箱激活

3. 选择类型
- 选择服务号
4. 信息登记
- 主体类型：企业（可以注册50个账号，个体工商：5个）
- 企业名称：
- 营业执照注册号：
- 验证方式：
	+ 支付验证：
		* 开户名称：
		* 对公账号：
		* 再次输入账号：
		* 用户地点：

		* 1. 企业对公账号
		* 2. 用对公账号向腾讯公司进行打款
		* 3. 腾讯公司收到汇款后，会将注册结果发至管理员微信、公众平台站内信
		* 4. 打款将原路退回至您的对公账号
	+ 微信认证（支付功能）：
- 运营者信息信息登记
	- 运营者身份证姓名：
	- 运营则身份证号码：
	- 运营者手机号码：
	- 短信验证码：
	- 运营者身份验证： 
	请先填写企业名称与运营者身份信息验证
		* 扫码的微信号将称为该号的管理员微信号
		* 微信没有绑定银行卡，请先绑定 


5. 公众号信息
- 账号名称(0/30)：
- 功能介绍(0/120)：
- 运营地区：

## 服务号微信认证
- 微信认证-开通
1. 同意协议
2. 填写资料
- 类型：企业法人及个体工商户
	+ 企业法人
- 企业业务资料
	+ 企业名称
	+ 组织机构代码/统一社会信用代码:
	+ 工商执照注册号：
	+ 法定代表人/企业负责人姓名：
	+ 经营范围（一般经营范围）：
		技术开发、技术服务、技术咨询、成果转让；计算机
		* 与企业工商营业执照上一致
	+ 经营范围（前置许可经营范围）：
	+ 企业开户名称：
	+ 企业开户银行：
	+ 企业银行账号：
- 运营者信息
	+ 运营者姓名：
	+ 运营者部门与职位：
	+ 运营者手机号码：
	+ 短信验证码：
	+ 运营者电子邮箱：
	+ 运营者身份证号码：
	+ 扫码验证运营者身份：
- 申请公函
	+ 下载打印并签字、盖章及日期
	+ 扫描上传文件
- 企业工商营业执照
	+ 扫描上传
- 其他证明材料（选填）
	+ 扫描上传

3. 确认名称
- 命名方式：
	+ 商标名：商标文件
	+ 媒体名：
	+ 自选词汇：

4. 填写发票
- 发票类型：普通发票
- 邮寄地址：
- 街道详细地址：
- 邮政编码：
- 联系人：
- 练习电话：

5. 支付费用
- 扫码支付

# 2. 申请域名
- 阿里云
- 腾讯云

# 3.购买服务器
- 阿里云
- 腾讯云

- Ubunt 14 LTS

# 4. 域名备案及域名解析
- [dnspod](https://www.dnspod.cn)
- 帮助中心-> DNSPod的解析（无缝迁移）

# 5. 服务器配置

## 1. 服务器上创建普通用户并设置sudo
`# useradd demo`
`demo  ALL=(ALL) ALL`

## 2. 服务器上安装基本软件包
- Ubuntu:
`$ sudo apt-get install git vim openssl build-assential libssh-dev wget curl`

- CentOS 7.2：
`$ sudo yum -y install git vim openssl wget curl`

### **生产环境部署（Ubuntu）** 本地与服务器版本一致
- node -v   		v8.1.2
- npm -v			v5.0.3
- yarn --version	0.24.6
- pm2 -v			2.6.0
- vue -V			2.8.2
- brew -v 			(本地)

## 3. 服务器上安装Node
- 安装nvm
	`$ su - demo`
	`$ sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash`
	`$ export NVM_DIR="$HOME/.nvm"`
	
- 这行载入nvm	
	`$ [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" ` 
- 注意(Mac机问题)：
	`source ~/.bashrc`

`$ nvm --version` 0.29.0
`$ nvm ls`

- 安装
`$ nvm install v8.1.2` 			
- 使用版本
`$ nvm use v8.1.2` 				
- 默认使用此版本
`$ nvm alias default v8.1.2`	
`$ nvm -v`
- NodeJS官网获取测试代码（About）
`$ vim server.js`
	code...
`$ node server.js`

## 4. 修改防火墙
`$ sudo vi /etc/iptables.up.rules`
	* filter
	# allow all connections
	-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

	# allow out traffic
	-A OUTPUT -j ACCEPT

	# allow http https
	-A INPUT -p tcp --dport 443 -j ACCEPT
	-A INPUT -p tcp --dport 80 -j ACCEPT
	-A INPUT -P tcp --dport 8081 -j ACCEPT

	# allow ssh port login
	-A INPUT -p tcp -m state --state NEW --dport 39999 -j ACCEPT

	# ping
	-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

	# mongodb connect
	-A INPUT -s 127.0.0.1 -p tcp --destination-port 19999 -m sate --state NEW,ESTABLISHED -j ACCEPT
	-A OUTPUT -d 127.0.0.1 -p tcp --source-port 19999 -m state --state ESTABLISHED -j ACCEPT

	# website
	-A INPUT -s 127.0.0.1 -p tcp --destination-port 3000 -m state --state NEW,ESTABLISHED -j ACCEPT
	-A OUTPUT -d 127.0.0.1 -p tcp --source-port 3000 -m state --state ESTABLISHED -j ACCEPT

	# lingyim.com
	-A INPUT -s 127.0.0.1 -p tcp --destination-port 3006 -m state --state NEW,ESTABLISHED -j ACCEPT
	-A OUTPUT -d 127.0.0.1 -p tcp --source-port 3006 -m state --state ESTABLISHED -j ACCEPT

- 载入iptables配置
`$ sudo iptables-restore < /etc/iptables.up.rules`

- 关闭防火墙(Ubuntu)
`$ sudo ufw stop` 

- 启动NodeJS服务
`$ node server`

- 另外一个ssh连接服务器
`$ curl http://127.0.0.0:3006`

### **本地按照同样的方式安装以上操作**


## 5. 配置 Vue-Yarn-PM2 工具环境

### 5.1 本地安装yarn(MAC)
- Mac: `~ brew install yarn`

### 5.2 服务器安装yarn，替代npm
- [yarn](http://yarnpkg.com)
- 安装： v2.5.0
`$ sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo`

- 如果你没有安装 Node.js，你也应该配置 NodeSource 仓库：
`$ curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -`

- 安装yarn
`$ sudo yum -y install yarn`

## 7.3 配置yarn源 (本地+服务器)
`$ yarn config set registry https://registry.npm.taobao.org` 设为国内源

## 7.4 全局安装(本地+服务器)
`$ npm install vue-cli pm2 -g`

## 7.5 pm2服务，关闭当前node服务，使用pm2维护
`$ pm2 start server.js` 启动进程
`$ curl http://127.0.0.1:3006` 访问pm2服务

`$ pm2 list` 信息
`$ pm2 show server|server id` 详细信息
`$ pm2 stop server|server id` 关闭服务
`$ pm2 logs server|server id` 服务日志
`$ pm2 restart server|server id` 重启服务

# 8. nginx安装配置（本地+服务器）
`$ sudo yum -y install nginx`
`$ nginx -v`
`$ cd /etc/nginx/conf.d`
`$ sudo vim demo.com.conf`
upstream demo {
	# ip_hash; 分流
	server 127.0.0.1:3000;
	# server127.0.0.1:3001; 内网IP
}

server {
	listen 80;
	server_name demo.com;

	location / {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-Nginx-Proxy true;

		proxy_pass http://demo;
		proxy_redirect off;
	}
	#location ~* ^.+\(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
	#	root /home/demo/demo/public;
	#}
}
`$ sudo service nginx restart`

- Server:nginx  (关闭nginx版本)
`$ sudo vim /etc/nginx/nginx.conf`
	+ sendfile on;
	+ tcp_nopush on;
	+ tcp_nodelay on;
	+ keepalive_timeout 65;
	+ types_hash_max_size 2048;
	+ server_tokens off;

# 9.DNSpod.com域名解析
- www.demo.com 


## 9.安装MongoDB
- [官网](https://docs.mongodb.com/manual/administration/install-on-linux/)

- Ubuntu 14.04

echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

echo "deb [ arch=amd64 ] http://mirrors.aliyun.com/mongodb/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

- mongodb.repo
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

`$ sudo yum install -y mongodb-org`
`$ sudo service mongod start`
`$ sudo service mongod status`
`$ sudo cat /var/log/mongodb/mongod.log`
`$ sudo cd /etc/apt/sources.list.d/`
`$ vim mongodb-org-3.4.list` 错误时修改此文件里地址

`$ sudo service mongod start`
`$ sudo vi /etc/mongod.conf`
port:19999
bindIp: 127.0.0.1 只有当前服务可以访问

security:	
	authorization: 'enabled' 输入账号和密码

- 防火墙设置
$ sudo vi /etc/iptables.up.rules

# ping 
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
# mongodb connect
-A INPUT -s 127.0.0.1 -p tcp --destination-port 19999 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 19999 -m state --state ESTABLISHED -j ACCEPT

# 10.git仓库
## 10.1 码云私有仓库
 
## 10.2 本地环境部署
- （本地+服务器）生成公钥
$ sudo ssh-keygen -t rsa -b 4096 -C '67668283@qq.com'
- 开启代理（服务器也开启）
`$ eval "$(ssh-agent -s)"`
`$ ssh-add ~/.ssh/id_rsa`
# cd ~/.ssh
# cat id_rsa.pub
复制代码到git项目SSH公钥

- git全局设置
git config --global user.name "cg"
git config --global user.email "67668283@qq.com"

- 创建git仓库
mkdir wx.demo.com
cd wx.demo.com
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin git@git.oschina.net:intelligencetech:wx-demo-com.git
git push -u origin master

- 已有项目
cd existsingGitRepo
git remote add origin git@git.oschina.net:intelligencetech/nodetest.git
git push -u origin master

git clone git@git.oschina.net:intelligencetech/nodetest.git


## 10.3 pm2 一键盘部署发布项目（本地服务器）
- ecosystem.json
{
	"apps": [{
        "name": "wx-demo-com",     
        "script":"server.js", // start script name
        //"instances": 2,     // core numbers
        "env": {
                "COMMON_VARIABLE": "true"
        },
        "env_production":{
                "NODE_ENV": "production"
        }
	}],
	"deploy": {
	        "production": {
	                "user": "server_username",
	                "host": ["120.26.235.4"],
	                "port": "39999",
	                "ref": "origin/master",
	                "repo": "git@git.oschina.net:yuanchuangjs/nodetest.git",
	                "path":"/www/nodetest/production",
	                "ssh_options":"StrictHostKeyChecking=no",
	                //"post-deply": "npm install "
	                "pre-deploy-local": "echo 'Deploy Done!'",
	                "env": {

	                }

	        }
	}
}

git add ecosystem.json
git commit -m "add deploy"
git push origin master

添加Port 39999
git commit -am 'add port'
git push origin master

- 在本地
pm2 deploy ecosystem.json production setup 初始化
pm2 deploy ecosystem.json production  发布

修改server.js 的输出内容hello....
git commit -am "Update "
git push origin maser
pm2 deploy ecosystem.json production

刷新浏览器可以看到修改的内容


- 自动化生产环境部署
`$ pm2 deploy ecosystem.json production && ssh -p 59462 lingyima@118.190.208.161 'cd /www/hosts/4test/production/source/ && git pull origin master && pm2 restart 4test'`



## 公众开放平台以 UnionID 统一小程序与公众号用户信息
- 微信开发平台

[微信开放平台](https://open.weixin.qq.com)
### 注册流程
- 邮箱：
- 密码：
- 再次输入密码：
- 验证码：

- 微信服务号
	+ 开发->基本设置->微信开放平台账号绑定

# sass

base.less
a { color: #ccc}

page.less
import './base.less'
.title {
	font-size: 12px;
	a { font-size: 16px;}
}


- color.sass
$grey: #ccc

import './color.sass'
import './font.sass'
a
	color: $gray

- pages.sass
import './base.sass'
.title 
	font-size: $baseFont
	a
		font-size: $middleFont


# Koa后台Web框架及中间件
- Express 放弃
- Koa1
- Koa2 (ES6)


`# npm express@4.13.3 koa@1.2.0`
## express.js
var express=require('express')
var app = express()
var asyncIO = (cb)=>{
	setTimeout(()=>{
		cb()
	},500)
}
var mid = (req, res, next) => {
	req.body = 'mark'
	next()
	
}

app.use(mid)

// next: 当前代码转交给下一个代码处理
app.use((req,res,next)=>{
	// 异步查询数据
	asyncIO(()=>{
		req.body += ' saved'	
		res.send(req.body + 'done')
	})
		
})

app.listen(3000)


## koa.js
var koa=require('koa')
var app=koa()

var asyncIO = function(){
	return new Promise(function(resolve){
		setTimeout(function(){
			resolve()
		}, 500)
	})
}
var mid=()=>{
	`return function *(){`
		this.body = 'mark'
		yield next
		this.body += ' done'
	}
}

app.use(mid())
`app.use(function *(next){`
	yield asyncIO()
	this.body += 'saved'
	yield next
})

app.listen(3000)


- koa2.js
+ koa@6+以上
`# npm i koa@latest`

const Koa=require('koa')
const app=new Koa()

const asyncIO = () => {
	return new Promise(resolve => setTimeout(resolve, 500))
}

const mid = ()=>async(ctx,next) => {
	ctx.body='mark'
	await next()
	ctx.body = ctx.body + 'done'
}

app.use(mid())
app.use(async(ctx,next) => {
	await asyncIO()
	ctx.body += ' saved'
	await next()
})

app.listen(3000)


# Webpack打包构建工具重构小程序
- 小程序->简易教程->下载源码

## 1.index.wxml
<template lang='pug'>
	view.container
		view.userInfo(bindtap='bindViewTab')
			text.userinfo-nickname {{userInfo.nickname}}
</template>
<script>
	复制index.js代码此处
</script>

<style lang="sass">
	复制index.wxss代码此处
</style>

## 2.logs日志页按以上方式修改

## 3.删除index.js,index.wxss,logs.js,logs.wxss

## 4.index.wxml,logs.wxml后缀名改为index.mina,logs.mina

##　5.根目录（pages目录同一个）下新建tasks目录，并在其下目录下新建build.js文件
- build.js
	// 需要删除目录所以引入sheeljs
	require('shelljs/global')

	const webpack=require('webpack')
	const fs=require('fs')
	// 工具函数
	const _=require('lodash')
	const { resolve } = require('path')

	const r = url => resolve(process.cwd(), url)

	const webpackConf = require('./webpack.conf')
	const config = require(r('.mina-confnig'))
	const assetsPath = r('./mina')


	// 清空目录
	rm ('-rf',assetsPath)
	mkdir(assetsPath)

	var renderConf = webpackConf
	// 指定入口文件
	var entry = () => _.reduce(config.json.pages, (en, i) => {
		en[i] = resolve(process.cwd(), './', `${i}.mina`)
		return en
	},{})	
	
	renderConf.entry = entry()
	renderConf.entry.app = config.app
	
	renderConf.outpout = {
		path: r('./mina'),
		filename: '[name].js'
	}

	// 声明编译器
	var compiler = webpack(renderConf)

	fw.writeFileSync(r('./mina/app.json'), JSON.stringify(confnig.json), 'utf8')

	// 监听整个文件的变化
	compiler.watch({
		aggregateTimeout: 300,
		poll: tue
	}，(err,stats){
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: true,
			chunks: true,
			chunkModules: true
		}) + '\n\n')
	})

## 6.taks/webpack.conf.js
const { resolve } = require('path')
`const r = url => resolve(__dirname, url)`
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = requrie('progress-bar-webpack-plugin')


const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
	filename: '[name].wxss'
})

module.exports = {
	devtool: false,
	output: {
		path: r('./mina'),
		filename: '[name].js',

	},
	resolve: {
		alias: {
			utils: r('../utils/util')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						['env', {
							modules: false
						}]
					]
				}
			},
			{
				test: /\.sass$/,
				use: extractSass.extract({
					use: [
						{loader: 'css-loader'},
						{
							loader: 'postcss-loader',
							options: {
								plugins: (loader) => [
									require('autoprefixer')({
										browsers: [
											'last 2 versions'
										]
									})
								]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								indentedSyntax: true
							}
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.mina$/,
				loader: 'wechat-mina-loader',
				options: {
					path: r('../'),
					dist: './mina'
				}
			}
		]
	},

	plugins: [
		extractSass,
		new CopyWebpackPlugin([
			{
				from : {
					`glob: 'pages/**/*.json',`
				},
				to: ''
			},
			{
				from: 'static',
				to: 'static'
			}
		]),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			souceMap: false
		}),
		new ProgressBarPlugin()
	]
}

## 7. /mina-config.js
const { resolve } = require('path')
`const r = url => resolve(__dirname, url)`

module.exports = {
	"json": app.json内容,
	"style": {
		url: r('./style/base.sass'),
		lang: 'sass'
	},
	"app": r('./app.js')
}

## 8. /vender.js
import regeneratorRuntime from 'regenerator-runtime'
global.regeneratorRuntime = regeneratorRuntime
import util from './utils/util'
global.util = util

import R from 'ramda'
global.R = R

const asyncWrap = fn => (options = {}) => new Promise((resolve) => {
	let conf = {
		success: res => {
			console.log(res)
			resolve(res)
		}
	}
	wx[fn](R.merge(conf, options))
})

wx.getSystemInfoAsync = asyncWrap('getSystemInfo')
wx.loginAsync = asyncWrap('login')
wx.getUserInfoAsync = asyncWrap('geUserInfo')
wx.reqAsync = asyncWrap('request')

## 8. /style/base.sass
app.wxss复制到此处

## 9. /index/index.mina
```
<script>
const { regeneratorRuntime, util } = global
onLoad
改为async onLoad，去掉var that=this

app.gerUserInfo...
改为const userInfo = await app.getUserInfo（）
this.setData({
	userInfo: userInfo
})
</script>
```

## 9. /app.js
import './style/base.sass'
import './vendor'

## 9. 安装依赖项
npm i babel-loader copy8-webpack-lugin pug ramda regenerator-runtim webpack wechat-mina-loader node-sass lodash babel-core babel-preset-env progree-bar-webpack-plugin shelljs style-loader postcss-loader extract-text-webpack-plugin sass-loader css-loader style-loader consolidate vue-template-compiler
node ./tasks/build

## 10. 修改style- index.mina, logs.mina为sass语法
<style lang="sass">
.useinfo 
	display: flex
	flex-direction: column

</style>

## 11. 打开微信小程序开发工具
- 取消选择开启ES6转ES5


# SSR
> Server-side Render
[VueSSR](https://ssr.vuejs.org)

- vue.js
const app=new Vue({})
const store=new VueX.Store({})
const route = new Router({
	routes: [
		{path: '/p1', component: Page1}
		{path: '/p2', component: Page2}
		{path: '/p3', component: Page3}
	]
})

- entry-serer.js
exports default context = {
	router.push(context.url)
	return Promise.all(router.getMatchedComponents().map(
		component => {
			if (component.fetchServerData) {
				return component.fetchServerData(store)
			}
		}
	)
	.then(()=>{
		context.state = store.state
		return app
	})
}

store.replaceState(window.__INITisl_state__)
app.$mount('#app')


# Nuxt年后端同构SSR框架
$ npm i vue-cli -g
$ vue init nuxt/koa fire
Project name:fire
Project description:
Author:
Koa version
1.x
> 2.x

$ cd fire
$ yarn install 
$ npm run dev


- components 组件:footer
- layouts 布局：输出到前段页面
	+ 不能更改
- pages 路由、视图(不能更改)
	+ aboute.vue
	+ index.vue
	+ role
		+ index.vue
- plugins (实例化之间插件)
- static 静态目录
	+ css
	+ img

- server 
	+ middleware 中间件
	+ index.js 启动文件
- store

nuxt.config.js
	css: ['~static/css/main.css']

# Pug(**Jade**)后端模版引擎
var text = 'abc'
p#desc
	a.link(href='xxx') 链接<strong>abc</strong>
	span #{text}
if isText
	p aaa
else 
	p bbb
- var obj = {a: 1, b: 2}
- for (var k in obj)
	p= obj[k]

- each v,key in obj
	p #{key}: #{v}

mixin sec(name)
	p abc #{name}

+sec(1)
+sec(2)


## 开始安装
$ npm install -g pug pug-cli

## 编辑index.pug
doctype html
html
    head
            title hello pug 
    body
        h1 pug pug

## 运行一下代码
$ pug index.pug

## 代码编辑器优化
- sublime，可以在package control->install package中安装pug

- webStrom，如果出现Invalid indentation,you can use tabs or spaces but not both错误，可以参考这篇文章[Jade报错：Invalid indentation,you can use tabs or spaces but not both问题
](http://blog.csdn.net/greenqin... PS:学生可以凭借edu邮箱免费使用正版

## 使用命令：
$ pug -P -w index.pug

## 类名和ID名
a.button
a(class="button")

## 属性
属性可以使用()包裹起来,属性值之间用逗号隔开
比如

a(href="google.com",title="google")

## 文本内容
a(href="google.com",title="google") Hello World

## 多行文本内容
p.
    asdfasdfa
    asdfasd
    adsfasd
    asdfasdfa
或者
p
    | dfas
    | dfas
    | dfas

## 文本含有标签
p
    | dfas <strong>hey</strong>
    | dfas
    | dfas
或者
p
    | dfas <strong>hey</strong>
        strong hey man
    | dfas
    | dfas

## 单行注释
// just some paragraphs
<!-- just some paragraphs-->

## 非缓冲注释-不会被编译到HTML
//- will not output within markup

## 块注释
第一种
body
  //
    As much text as you want
    can go here.
第二种   
<body>
  <!--
  As much text as you want
  can go here.
  -->
</body>

## IE注释
<!--[if IE 8]><html class='ie8'><[endif]-->
<!--[if IE 9]><html class='ie9'><[endif]-->
<!--[if IE ]><html class='ie8'><[endif]-->

## 变量
-var Pug="hello world"
 title #{Pug}

## 转义
-var htmlData='<strong>sdf</strong>'
p#{htmlData}
p!=htmlData

## 非转义
-var htmlData='<strong>sdf</strong>'
p !{htmlData}
p=htmlData

## 编译前的代码
p \#{htmlData}
p \!{htmlData}

## 没有的变量赋值
p=data;
是空值而不是undefined

## 流程代码
-var array=[1,2,3,4]
-for (var k in imooc)
    p=array[k]
-each k in array
    p:#{k}
-while


-var array=[1,2]
        if array.length>2
            p true
        else
            p false


## unless 为false，才执行，用法与if类似
-var array=[1,2]
        unless    !istrue
            p hello

## switch的功能
    -var name='java'
    case name
        when 'java': p Hi,java
    case name
        when 'pug': p Hi,pug
    default
        p Hi

## mixins

### 重复的代码块
mixin sayHi
    p hello everyone
+sayHi

- 编译后
<p>hello everyone</p>

### 传入参数
mixin pet(name)
  li.pet= name
ul
  +pet('cat')

## blocks
mixin article(title)
  .article
      h1= title
      if block //是否有包含内容
        block
      else
        p No content provided
+article('Hello world')
+article('Hello world')
  p This is my

- 编译后：
<!--如果节点里面没有内容，就加上-->
<div class="article">
    <h1>Hello world</h1>
    <p>No content provided</p>
</div>
<div class="article">
    <h1>Hello world</h1>
    <p>This is my</p>
    <p>Amazing article</p>
</div>

## Attributes
mixin link(href, name)
  //- attributes == {class: "btn"}
  a(class!=attributes.class, href=href)= name

+link('/foo', 'foo')(class="btn")
attributes已经转义，所以应该使用！=避免二次转义

- 编译后:
<a href="/foo" class="btn">foo</a>

## 不确定参数
mixin list(id, ...items)
  ul(id=id)
    each item in items
      li= item

+list('my-list', 1, 2, 3, 4)
参数中要加入...，编译后：

<ul id="my-list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>

## 参考资料
[pug](https://github.com/pugjs/pug)
[Jade](http://www.imooc.com/learn/259)


# mongoose
- NodeJS里链接NodeJS应用
- MongoDB库

- Schema：数据库模版
- Model：模型，操作数据库CRUD 
- Entity：实体，通过model创建数据示例

# mkdir demo
# cd demo
# npm i mongoose
# vim mongoose.js
	const mongoose = require('mongoose')
	mongoose.Promise = Promise
	mongoose.set('debug',true)
	- 老板连接
	mongoose.connect('mongodb://localost/xxo', {
		useMongoClient: true
	})
	- 新版连接
	mongoose.createConnect()

	mongoose.connection.on('open',()=>{
		console.log('mongodb opened!')
	})

	const UserSchema = new mongoose.Schema({
		name: String,
		times: {
			type: Number,
			default: 0
		}
	})

	// 数据建模
	mongoose.model('User', UserSchema)

	const User = mongoose.mode('User')
	;(async() => {
		console.log(await User.find({}).exec())
		
		const user = new User({
			name: 'Vue'
		})

		await user.save()
		console.log(await User.find({}).exec())
	})

`$ node mongoose.js`


# 使用GraphQL而不是Restful API
> facebook开源的API查询语言，类似数据库的SQL

https://developer.github.com/v4/explorer/

query {
	viewer {
		login
		avatarUrl
		bio
	}
	repository(owner: "octocat", name: "hello-world") {
		issue(number:349) {
			id
		}
	}
}



# 前段框架
- Dojo
- Spine
	+ MVC框架
- ember
- prototype
+ jQuery
	+ DOM操作函数库
- require.js
	+ 模块化的开发框架
- backbone.js
- react
- vue: MV*模式
	+ Model绑定View
	+ 没有控制器概念
	+ 数据驱动、状态管理
- angular

# Vue
## Vue框架对比
- Vue和React
	+ Angular提供的更多是一整套解决方案，后者更像是一个生态
	+ Vue和React使用Vitual Dom

- vue
	+ 模版和渲染函数的弹性选择
	+ 简单语法及项目创建
	+ 更快的渲染速度和更小的体积

- React
	+ 使用于大型应用和更好的可测试性
	+ 适用于Web端和原生App
	+ 更大的生态圈带来更多的支持和工具

- Vue和React相同点
	+ 利用虚拟DOM实现快速渲染
	+ 轻量级
	+ 响应式组件
	+ 服务器端渲染
	+ 集成路由工具，打包工具及状态管理工具
	+ 优秀的支持和社区

## Vue版本
- vue 0.11
- vue 1.0
- vue 2.0
- vue 2.3.2

## Vue概念
- 不是框架
- 集合周边生态构成一个灵活的、渐进式的框架
	+ 声明式渲染 Declarative Rendering
	+ 组件系统 Component System
	+ 客户端路由 Client-Side Routing
	+ 大规模状态管理 Large Scale State Management
	+ 构建工具 Build System

## Vue核心思想
- 数据驱动
- 组件化

- 通过MVVM的数据绑定实现自动同步
View - ViewModel ->Model
DOM  <- Vue      - POJO(原生JS对象) 

Object.defineProperty(obj, "username", {get:function(){}, set:function(val){}}) 

##  node和npm的安装和环境搭建
- `https://nodejs.org/en/donwload`
- `npm install -g cnpm --registry=https://registry.npm.taobao.org`

- node -v
- npm -v

- npm install -g npm

- cnpm install -g cnpm
- cnpm -v
- cnpm list 安装的模块
- cd demo
- cnpm i vue --save-dev
- cnpm list

- -g：全局安装
- --save：将保存配置信息至package.json（package.json是nodejs项目配置文件）
- -dev：保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；

## vue环境搭建以及vue-cli使用
- vue多页面应用文件引用
	+ 官网引用:<script src="https://unpkg.com/vue/dist/vue.js"></script>
		* <div id="app"></div><span>{{message}}</span>
		* <script>new Vue({el:"#app",data:{message: "hello world"}})</script>
	+ npm安装
- vue-cli构建SPA应用
	+ npm install -g vue-cli
	+ vue init webpack-simple demo
	+ vue init webpack demo2

- 项目构建安装
	+ `# npm install` 	依赖插件全部插件
	+ `# npm run dev` 	运行开发模式
	+ `# npm run build`