# 生产环境所需要素

## 1.购买域名

- 优先级：
	+ 纯英文
	+ 纯数字
	+ 纯拼音
	+ 域名越短越好

## 2.购买服务器

- AWS, Linode, DigitOcean/Heroku
- aliyun ECS,青云,UCloud,百度云

- 1CPU1G: 20~30K请求量，并发100~1000
- 2CPU4G: 并发上万

## 3.域名备案

- dnspod.cn

## 4.配置服务器应用环境

- 本地测试服务器：test.com, 172.16.0.1
	+ 永久修改hostname: `vim /etc/sysconfig/network`
		* hostname=test.com
	+ 临时修改
		* `# hostname test.com`
	+ 添加 `# vim/etc/hosts`
		* 本机IP地址 test.com 
	+ CentOS 7
		* `# hostnamectl set-hostname test.com`
- 生产环境服务器：server.com, 120.30.203.10

1. 创建普通用户并且为此用户拥有管理员权限

- test.com上添加普通用户
`[root@test.com ~]# adduser devadmin`
`[root@test.com ~]# passwd devadmin`

- test.com上为devadmin拥有管理员权限
`[root@test.com ~]# visudo`
	devadmin ALL=(ALL) ALL

- server.com上添加普通用户
`[root@server.com ~]# adduser devadmin`
`[root@server.com ~]# passwd devadmin`

- server.com上为devadmin拥有管理员权限
`[root@server.com ~]# visudo`
	devadmin ALL=(ALL) ALL

- server.com上修改sshd配置信息
`[root@server.com ~]# vim /etc/ssh/sshd_config`
	Port 20939
	AddressFamily any
	Protocol 2
	HostKey /etc/ssh/ssh_host_rsa_key
	HostKey /etc/ssh/ssh_host_ecdsa_key
	HostKey /etc/ssh/ssh_host_ed25519_key
	LoginGraceTime 2m
	PermitRootLogin no
	StrictModes yes
	MaxAuthTries 6
	MaxSessions 10
	AuthorizedKeyFile .ssh/authorized_keys
	PasswordAuthentication yes (VPN时设置no，AddressFamily VPN地址)
	PermitEmptyPasswords no
	UsePAM yes
	AllowAgentForwarding yes
	X11Forwarding yes
	UseDNS no
	Subsystem sftp /usr/libexec/openssh/sftp-server
	**AllowUsers devadmin**
	AllowUsers devadmin

2. 基于密钥认证登录server.com
- test.com切换普通用户devadmin
`[root@test.com ~]# su - devadmin`

- test.com生成密钥对儿
`[devadmin@test.com ~]$ ssh-keygen -t rsa -C "邮箱地址"`

- ssh-agent密钥管理器运行ssh-agent以后，使用ssh-add将私钥交给ssh-agent保管(本地与服务器都加入)
`$ eval "$(ssh-agent -s)"`
`$ ssh-add ~/.ssh/id_rsa`
或
`# ssh-add bash && ssh-add`

- 复制test.com的evadmin用户的公钥文件内容到server.com的 /home/devadmin/.ssh/authorized_keys文件里
`[devadmin@test.com ~]$ ssh-copy-id -i /home/devadmin/.ssh/id_rsa.pub -p 20939 devadmin@120.30.203.10`

- 查看server.com
`[devadmin@server.com ~]$ ls -l .ssh/authorized_keys`
注意：authorized_keys的文件权限是600

- 测试是否基于密钥认证登录，无需输入密码可登录
`[devadmin@test.com ~]$ ssh -p 20939 devadmin@120.30.203.10`

3. iptable防火墙
- 清空
`[devadmin@server.com ~]$ sudo iptables -F` 

- 创建filter文件
`[devadmin@server.com ~]$ sudo vim /etc/iptables.up.rules`
*filter

# allow all connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# allow out traffic
-A OUTPUT -j ACCEPT

# allow http https 
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT

# allow ssh port login
-A INPUT -p tcp -m state --state NEW --dport 20399 -j ACCEPT
ssh端口20399可登录

# ping
-A IINPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# log denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7

# drop incoming sensitive connections
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set

# 某个IP60秒内对80端口发出160此请求没敏感的访问
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP

# mongodb connect
-A INPUT -s 127.0.0.1 -p tcp --destination-port 19999 -m sate --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 19999 -m state --state ESTABLISHED -j ACCEPT

# website
-A INPUT -s 127.0.0.1 -p tcp --destination-port 3000 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 3000 -m state --state ESTABLISHED -j ACCEPT

# lingyim.com
-A INPUT -s 127.0.0.1 -p tcp --destination-port 3006 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 3006 -m state --state ESTABLISHED -j ACCEPT


# reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT

`[devadmin@server.com ~]$ sudo iptables-restore < /etc/iptables.up.rules`

- Ubuntu
`[devadmin@server.com ~]$ sudo ufw status|enable`

`[devadmin@server.com ~]$ sudo vim /etc/network/if-up.d/iptables`
	#!/bin/sh
	iptables-restore /etc/iptables.up.rules
`[devadmin@server.com ~]$ sudo chmod +x /etc/network/if-up.d/iptables`

4. fail2ban: 在epel源中，在https://mirrors.aliyun.com
`[devadmin@server.com ~]$ sudo yum -y install fail2ban`
`[devadmin@server.com ~]$ sudo vim /etc/fail2ban/jail.conf`
	bantime=3600
	destemail=67668283@qq.com
	action=%(action_mw)s
	[ssh]
`[devadmin@server.com ~]$ sudo systemctl status fail2ban`

5. server.com机上安装NodeJS
- Ubuntu
`[devadmin@server.com ~]$ sudo apt-get install vim  git openssl build-essential libssl-dev wget curl`

- CentOS 7
`[devadmin@server.com ~]$ sudo yum -y install vim git openssl wget curl`
 
- 安装nvm
`[devadmin@server.com ~]$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash`

`[devadmin@server.com ~]$ export NVM_DIR="$HOME/.nvm"`
`$ [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" `

- 注意(Mac机问题)：`source ~/.bashrc`

`[devadmin@server.com ~]$ nvm --version` 0.29.0
`[devadmin@server.com ~]$ nvm ls`
`[devadmin@server.com ~]$ nvm install v8.1.2` 			安装
`[devadmin@server.com ~]$ nvm use v8.1.2` 				使用此版本
`[devadmin@server.com ~]$ nvm alias default v8.1.2`	默认使用此版本
`[devadmin@server.com ~]$ nvm -v`

- 增加监控数目
`[devadmin@server.com ~]$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

- NodeJS官网获取测试代码（About）
`[devadmin@server.com ~]$ vim server.js`
const http=require('http')
<!--ES6模版字符串-->
const homePage=`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Node部署上线示例</title>
</head>
<body>
<h1>标题</h1>
</body>
</html>
`
http.createServer((res,req)=>{
	res.statusCode=200
	res.setHeader('Content-Type','text/html')
	res.end(homePage)
})
.listen(3000, ()=>{
	console.log('Server Running At 3000 port.')
})

`[devadmin@server.com ~]$ node server.js`

- 另外一个ssh连接服务器
`$ curl http://127.0.0.0:3000`
**client.com机上按照同样的方式安装NodeJS**


6. 配置 Vue-Yarn-PM2 工具环境

- client.com机上安装yarn
`[devadmin@client.com ~]$ sudo yum -y install yarn`
- MAC机: `~ brew install yarn`
	
- server.com机上安装yarn，替代npm
[yarn v2.5.0](http://yarnpkg.com)
`[devadmin@server.com ~]$ sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo`
`[devadmin@server.com ~]$ sudo yum install yarn`

**如果你没有安装 Node.js，你也应该配置 NodeSource 仓库：`$ curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -`**


- 配置yarn源 - client.com
`[devadmin@client.com ~]$ yarn config set registry https://registry.npm.taobao.org`

- 配置yarn源 - server.com
`[devadmin@server.com ~]$ yarn config set registry https://registry.npm.taobao.org`

- 局域配置国内源：`$ npm --registry=https://registry.npm.taobao.org install -g pm2`

- 注意：
`$ cnpm sync koa` 
 使用npm安装koa不了时，同步到国内镜像站

- 更新版本
`[devadmin@client.com ~]$ npm -registry=https://registry.npm.taobao.org install bcrypt@0.8.7 --save`

- jade模块
`[devadmin@client.com ~]$ npm -registry=https://registry.npm.taobao.org install jade@1.11.0 --save`


- mongoose模块
`[devadmin@client.com ~]$ npm -registry=https://registry.npm.taobao.org install mongoose@4.8.2 --save`
- 安装依赖模块
`[devadmin@client.com ~]$ npm -registry=https://registry.npm.taobao.org install`


- npm install module-name -save 	
	+ 自动把模块和版本号添加到dependencies部分
- npm install module-name -save-dve
	+ 自动把模块和版本号添加到devdependencies部分

- npm install --production
	+ npm自动安装package.json中dependencies部分的模块；
- npm install 
	+ 则package.json中指定的dependencies和devDependencies都会被自动安装进来




- 全局安装vue-cli和pm2 - client.com
`[devadmin@client.com ~]$ npm install vue-cli pm2 webpack gulp grunt-cli -g`

- client.com机上使用pm2管理NodeJS服务
`[devadmin@client.com ~]$ pm2 start server.js` 启动进程
`[devadmin@client.com ~]$ curl http://127.0.0.1:3000` 访问pm2服务

`[devadmin@client.com ~]$ pm2 list` 信息
`[devadmin@client.com ~]$ pm2 show server|server id` 详细信息
`[devadmin@client.com ~]$ pm2 stop server|server id` 关闭服务
`[devadmin@client.com ~]$ pm2 logs server|server id` 服务日志
`[devadmin@client.com ~]$ pm2 restart server|server id` 重启服务


- 全局安装vue-cli和pm2 - server.com
`[devadmin@server.com ~]$ npm install vue-cli pm2 webpack gulp grunt-cli -g`
`[devadmin@server.com ~]$ pm2 start server.js`


7. server.com机上nginx安装配置（**本地+服务器**）
`[devadmin@server.com ~]$ sudo yum -y install nginx`
`[devadmin@server.com ~]$ nginx -v`

- 配置虚拟主机
`[devadmin@server.com ~]$ sudo cd /etc/nginx/conf.d`
`[devadmin@server.com ~]$ sudo vim demo.com.conf`
upstream demo {
	# ip_hash; 分流
	server 127.0.0.1:3000;
	# server127.0.0.1:3001; 内网IP
}
server {
	listen 80;
	server_name demo.com;
	server_name 120.30.203.10; # 仅用于访问唯一IP地址

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

- 修改nginx配置
`[devadmin@server.com ~]$ sudo vim /etc/nginx/nginx.conf`
	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	server_tokens off;

	include /etc/nginx/conf.d/*.conf

- 重启nignx服务
`[devadmin@server.com ~]$ sudo nginx -t`
`[devadmin@server.com ~]$ sudo service nginx restart`

- 测试访问
`[devadmin@server.com ~]$ curl 120.30.203.10`


8. www.dnspod.com网站上域名解析

- 慕课网：[进击Node.js基础（一）](http://www.imooc.com/learn/348)

- 1. 域名服务商：域名持有者实名认证
- 2. dnspod.cn网站添加域名解析：田间域名demo.com
	+ 网站底部“常见问题”->功能介绍及使用教程->各个注册商修改域名DNS地址的方法
	+ 复制DNS域名修改到域名服务商指定域名的DNS修改页面中修改
- 3. 查看dnspos.cn的添加的域名是否有更新域名解析主机记录
- 4. 添加记录
	+ 主机类型：A(Address IPv4), CNAME(填写域名), MX,TXT
	+ www A IP地址
	+ 顶级域名：@ A IP地址
	+ 泛解析：* A IP地址 
	+ 企业邮箱反垃圾：mail TXT 企业邮箱的反垃圾内容

	

- 5. 微信小程序图片放置七牛云
	+ 通过我们的域名访问七牛云
	+ img.web CNAME 七牛云DNS域名



9. 安服务器上安装MongoDB
[MongoDB官网](https://docs.mongodb.com/manual/administration/install-on-linux/)
- 配置yum源

`[devadmin@server.com ~]$ sudo vim /yum.repos.d/mongodb.repo`
	[mongodb-org-3.4]
	name=MongoDB Repository
	baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
	gpgcheck=1
	enabled=1
	gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

`[devadmin@server.com ~]$ sudo yum install -y mongodb-org`
`[devadmin@server.com ~]$ sudo service mongod start`
`[devadmin@server.com ~]$ sudo service mongod status`
`[devadmin@server.com ~]$ sudo cat /var/log/mongodb/mongod.log`

- 错误提示：(/usr/lib/systemd/system/mongod.service; enabled; vendor preset: disabled
- 解决：`[devadmin@server.com ~]$ sudo vi /etc/mongod.conf`
	把fork修改为 false ， pidFilePath修改为dbPath的路径
	fork: false
	pidFilePath: /var/lib/mongodb/mongod.pid


- Ubuntu: 错误时修改此文件里地址
`[devadmin@server.com ~]$ sudo cd /etc/apt/sources.list.d/`
`[devadmin@server.com ~]$ vim mongodb-org-3.4.list` 

`[devadmin@server.com ~]$ sudo service mongod start`
`[devadmin@server.com ~]$ sudo vi /etc/mongod.conf`
	port:19999
	bindIp: 127.0.0.1 只有当地址可以访问

security:	
	authorization: 'enabled' 输入账号和密码

`[devadmin@server.com ~]$ mongo --port 27017`

## 整个同步数据
- 1. 备份client.com数据库
`[devadmin@client.com ~]$ sudo mongodump -h 127.0.0.1:27017 -d dbname -o dbname.bak`

- 2. 打包备份文件
`[devadmin@client.com ~]$ tar zcvf name.bak.tar.gz dbname.bak/`

- 3. scp上传到server.com
`[devadmin@client.com ~]$ scp -P 20939 dbname.bak.tar.gz devadmin@120.30.203.10:/home/devadmin/dbbackup/`

- 4. server.com上的tar包进行解压并导入数据库
`[devadmin@server.com ~/dbbackup]$ tar xvf dbname.bak.tar.gz`
`[devadmin@server.com ~/dbbackup]$ cd dbname.bak`
`[devadmin@server.com ~/dbbackup]$ mongorestore --host 127.0.0.1:27017 -d 生产环境数据库名 导入的数据库名`

- 测试
`[devadmin@server.com ~/dbbackup]$ mongo --port 27017`
> use dbname
> show tables

## 部分数据同步到生产服务器(数据库角色)
- 本地导出单表
`$ sudo mongoexport -d 数据库名 -c 表明 -q '{"name":{$ne:null}}' -o 导出文件名.json`

- scp上传到生产环境服务器
`$ scp -P 20939  导出文件名.json devadmin@120.30.203.10:/home/devadmin/dbbackup/`

- 导入数据表
`$ mongoimport --host 127.0.0.1:27017 -d 生产环境数据库名 -c users 导出文件名.json`

- 测试
> db.users.find({})

## 删除数据库(server.com)
`$ mongo --host 127.0.0.1:27017 dbname --eval "db.dropDatabase()"`
`$ mongoimport --host 127.0.0.1:27017 -d 生产环境数据库名 -c users 导出文件名.json`


## mongodb数据库角色 server.com
- mongodb默认没有管理员账号

1. 创建管理员账号
`$ mongo --port 27017`
`$ use admin`
> db.createUser({user: 'admin', pwd: 'adminpw',roles:[{role: 'userAdminAnyDatabase',db: 'admin'}]}) 

2. 管理员授权
> db.auth('admin','adminpw');

3. 为数据库创建用户管理权限
> use dbTest
> db.createUser({user: 'test-user',pwd:'test-pw',roles: [{role: 'readWrite', db:'dbTest'}]})

4. 备份角色
> db.createUser({user: 'test-user-backup',pwd:'test-pw-backup',roles: [{role: 'read', db:'dbTest'}]})

5. 创建手机app数据库
> use admin
> db.auth('admin','adminpw'); # 管理员授权

> use test-app

 管理权限
> db.createUser({user: 'test-app-user',pwd:'test-app-pw',roles: [{role: 'readWrite', db:'test-app'}]})

备胎
> db.createUser({user: 'test-app-user-backup',pwd:'test-app-pw-backup',roles: [{role: 'read', db:'test-app'}]})

6. 创建微信小程序数据库
> use admin
> db.auth('admin','adminpw'); # 管理员授权

> use test-wx

管理权限
> db.createUser({user: 'test-wx-user',pwd:'test-wx-pw',roles: [{role: 'readWrite', db:'test-wx'}]})

备胎
> db.createUser({user: 'test-wx-user-backup',pwd:'test-wx-pw-backup',roles: [{role: 'read', db:'test-wx'}]})


7. 创建微信服务号数据库
> use admin
> db.auth('admin','adminpw'); # 管理员授权

> use test-fuwuhao

管理权限
> db.createUser({user: 'test-fuwuhao-user',pwd:'test-fuwuhao-pw',roles: [{role: 'readWrite', db:'test-fuwuhao'}]})

备胎
> db.createUser({user: 'test-fuwuhao-user-backup',pwd:'test-fuwuhao-pw-backup',roles: [{role: 'read', db:'test-fuwuhao'}]})


8. 开启验证模式

```vim /etc/mongod.conf
security:
  authorization: 'enabled'
```

9. 登录数据

- 重启mongod服务
- $ mongo --port 19999
> use admin
> db.auth('admin','adminpw');
> show dbs

$ mongo 127.0.0.1:19999/数据库名 -u 用户名 -p 密码
> show tables
> db.users.find({})


10. 生产环境服务器数据库迁移

- 数据库导入另外一台服务器的数据库
$ mkdir db
$ cd db
$ mongodump -h 127.0.0.1:1999 -d test-app -u test-app-user -p test-app-pw -o test-app-old
$ tar zcvf test-app-old.tar.gz test-app-old

- 单表导出
$ mongoexport -h 127.0.0.1:19999 -d test-app -u test-app-user -p test-app-pw -c users -q '{"name":{$ne: null}}' -o ./test-app-old.json


- 本地服务器
$ scp -P 39999 用户名@生产服务器IP:/home/备份的数据库 ./
$ scp -P 39999 用户名@生产服务器IP:/home/备份的单表 ./

- 另外生产服务器
$ mkdir newdb && cd newdb

- 本地服务器
$ scp -P 39999 备份的数据库 用户名@生产服务器IP:/home/newdb/
$ scp -P 39999 单表问阿金 用户名@生产服务器IP:/home/newdb/

- 另外生产服务器
$ cd newdb 
$ tar 解压缩
$ cd 进入数据库目录
$ mongo --port 19999 
> use admin
> db.auth('admin','adminpw');

> use new-app-target
> db.createUser({user:'new-app',pwd:'new-app-pw',rules:[{role: 'readWrite', db:'new-app-target'}]})

> use admin
> db.auth('admin','adminpw');
> use new-wx-target
> db.createUser({user:'new-wx',pwd:'new-wx-pw',rules:[{role: 'readWrite', db:'new-wx-target'}]})

> use admin
> db.auth('admin','adminpw');
> use new-fuwuhao-target
> db.createUser({user:'new-fuwuhao',pwd:'new-wx-pw',rules:[{role: 'readWrite', db:'new-fuwuhao-target'}]})


- 导入数据库
$ mongorestore -h 127.0.0.1:19999 -d new-app-target -u new-app -p new-app-target ./newdb/备份的数据库

- 单表数据
$ mongoimport -h 127.0.0.1:19999 -d 数据库名 -u 用户名 -p 密码 -c users ./newdb/单表.json

$ mongo 127.0.0.1:19999/test-app-target -u 用户名 -p 密码
> show tables
> db.users.find({})


## 数据定时备份

$ mkdir tasks && cd tasks 
$ mognodb-back.sh

#!/bin/sh
	backUpDir=/home/root/backup/movie
	dateNow=`date +%Y_%m_%d_%H%M`
	backFileName=movie_$dateNow
	cd $backUpDir
	mkdir -p $backFileName
	mongodump -h 127.0.0.1:19999 -d dbname -u user -p passwd -o $backFileName
	tar zcvf $backFileName.tar.gz $backFileName
	rm -rf $backFileName
	NODE_ENV=$backUpDir@$backFileName node /home/root/tasks/upload.js
$ sh ./tasks/movie.sh

$ crontab -e 分别保存数据库
00 4 * * * sh /home/root/tasks/movie.sh
00 8 * * * sh /home/root/tasks/movie.sh



- 把数据定时发送到私有云服务器(七牛云)
- 文档->官方SDK->NodeJS文档->文件上传代码
$ cd tasks
$ npm install qiniu
$ vim upload.qiniu.js
var accessKey = 'your access key';
var secretKey = 'your secret key';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: bucket, 对象空间名
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

var parts = process.env.NODE_ENV.split('@')
var file = parts[1] + '.tar.gz'
var filePath = parts[0] + '/' + file


var localFile = "/Users/jemy/Documents/qiniu.mp4";
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key=file;


// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }

  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});

##　MySQL安装并备份 

10. git仓库 （本地 + 服务器一样配置）
- 1.建议码云**私有仓库**
- 2.复制id_rsa.pub代码到git项目SSH公钥

- git全局设置
`[devadmin@server.com ~]$ sudo git config --global user.name "cg"`
`[devadmin@server.com ~]$ sudo git config --global user.email "67668283@qq.com"`

- 创建git仓库
$ mkdir wx.demo.com
$ cd wx.demo.com
$ git init
$ touch README.md
$ git add README.md
$ git commit -m "first commit"
$ git remote add origin git@git.oschina.net:intelligencetech/wx-demo-com.git
$ git push -u origin master
$ git fetch
$ git merge origin/master
$ git push -u origin master

- 已有项目
$ cd existsingGitRepo
$ git remote add origin git@git.oschina.net:intelligencetech/nodetest.git
$ git push -u origin master
$ git clone git@git.oschina.net:intelligencetech/nodetest.git

11. pm2 自动化部署发布项目（本地服务器）
`[devadmin@client.com demo.com]$ vim ecosystem.json`
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
						"NODE" : "production"
	                }

	        }
	}
}

$ git add ecosystem.json
$ git commit -m "add deploy"
$ git push origin master

添加Port 39999
git commit -am 'add port'
git push origin master

### 在本地
- 初始化
pm2 deploy ecosystem.json production setup

- 发布 
pm2 deploy ecosystem.json production  

修改server.js 的输出内容hello....
git commit -am "Update "
git push origin maser
pm2 deploy ecosystem.js on production

刷新浏览器可以看到修改的内容

- 服务器
没有权限错误提示：sudo chmod 777 website
3000端口防火墙访问


- 本地服务器
$ sudo vim ~/.bashrc
```case $- in
	*i*);;
		*) return;;
		esac
```
注释以上所有代码
$source .bashrc


- 13. 同步到远程服务器
1. 修改代码
2. git add 
3. git commit
4. git push orign master
5. pm2 deploy ecosystem.jison production

## 示例2：使用mongodb数据库、js,css文件
1. 域名解析
2. 本地修改
app.js
var env=process.env.NODE_ENV || 'development';

// 默认连接线上数据库
var dbUrl = 'mongodb://用户名:密码@127.0.0.1：19999/数据库'
if (env === 'development') {
	dbUrl = 'mongodb://localhost/dbname'
} 

- ecosytem.json 
"ssh_options":"StrictHostKeyChecking=no",
"post-deply": "npm install --registry=https://registry.npm.taobao.org && grunt build && pm2 startOrRestart ecosystem.json --env production"


- 只提交源文件
- .gitignore
	public/build
	public/build/*

- nginx修改静态访问规则
location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
	root /www/movie/production/current/public;
} 

- 本地
$ git add 
$ git commit 
$ git push origin master
$ pm2 deploy ecosystem.json production setup
$ pm2 depoly ecosytemj.json production

- 生产
$ pm2 list

- 本地
$ git add 
$ git commit 
$ git push origin master
$ pm2 deploy ecosystem.json production setup
$ pm2 depoly ecosytemj.json production

- 生产
$ pm2 list

- 生产：修改防火墙

## Web APP
1. 域名解析
2. 本地
- 修改端口
- mongodb连接（测试本地或远程）
- ecosystem.json
	grunt build 删除（不需要静态资源）
3. 生产

## 微信小程序
1. 域名解析
2. 本地
- 监听端口
- 线上mongodb数据库密码
- ecossytem.json 
	+ 修改name,git
3. 生产
- 建立项目目录
- sudo chmod -R 777
- nginx配置
4. 本地
- git
- 发布
- 问题：重启次数、CPU占用率

5. 生产
- 测试 pm2 
- 修改防火墙

6. https
- Google: 2017(http不安全)
- Iturns: 2017(http不安全)
- 小程序：https

- ssl
	+ 域名，安全等级（dv）个人：blog
	+ 企业(ov)
	+ ev: SSL证书 （bank）

- 免费
startfssl(dv),沃通(dv) => firefox,chrmoe已经放弃

- CA机构：
	+ Synmantec
	+ juchake 
	+ 亚洲诚信

- upyun.com
- qiniu.com
- qcloud.com
	+ 申请证书
	+ 手动DNS认证信息
	+ DNSpod.com
		* 粘贴 CNAME 粘贴
	+ 下载证书
- nginx配置
server {
	`# rewrite ^(.*) https://$host$1permanent;`
	return 301 https://app.domain.com$requrest_uri;
}
server {
	listen 443;

	....

	if ($ssl_protocol = "") {
		rewrite ^(.*) https://$host$1 permanent;
	}

}




## 微信开放平台：unionid



	










