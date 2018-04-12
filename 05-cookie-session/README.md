# cookie/session
## cookie
> 服务器生成cookie之后相应给客户端, 在浏览器保存一些数据,每次请求都会带过来
- 不安全
- 4k 存储大小

## session 
> 基于 cookie 实现
- cookie 中有一个sessionID,服务器利用sessionid 找到 session文件,读取,写入
- 安全
- 保存在服务端

## session 劫持

## cookie
1. 读取: cookie-parser
2. 发送: cookie-session

## 安装包
`cnpm i express express-static cookie-parser cookie-session -S`

## 设置 cookie
// path: cookie 生效目录
// maxAge: 生效期限(单位:毫秒)
res.cookie('username','jack', {path: '/', maxAge: 30*24*3600*1000});

## 读取cookie
server.user(cookieParser)
server.user(path, (req, res, next)=>{
    // 保存在cookies 对象中
    req.cookies
})
- 下级目录cookie可以访问上级目录cookie

## 清除 cookie
- res.clearCookie(名字)


## 签名
app.use(cookieParser(sec))

## 加密 - `cookie-encrypter`
`app.user(cookieEncrypter(sec))`
- 条件:
    + signed: true
    + httpOnly: true


# session 中间件
`cnpm i cookie-session -S`

const cookieSession = require('cookie-session')
app.use(cookieSession)
app.use(cookieParser(sec))

## 写入


## 读取
