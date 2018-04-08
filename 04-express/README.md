# Express

## 安装 express 包
- `cnpm install express S`

- 创建服务
`const server = express()`

- 监听
`server.listen(8080)`

- 处理请求
`server.use(/, (req, res)=>{
  res.send()
})`

## 处理请求方法
- server.get(url, callback)
- server.post(url, callback)
- server.use(url, callback)

