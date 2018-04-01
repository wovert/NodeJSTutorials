const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const urlM = require('url')

var users = {};

var server = http.createServer((req, res)=>{
  var str = '';
  
  req.on('data', (data)=>{
    str += data;
  })
  
  req.on('end', ()=>{
    var obj = urlM.parse(req.url, true)
    const url = obj.pathname
    const GET = obj.query
    const POST = qs.parse(str)
    if (url == '/user') {
      switch(GET.act) {
        case 'reg':
          if (users[GET.user]) {
            res.write('{"ok":false, "msg":"此用户已存在"}');
          } else {
            users[GET.user] = GET.pass;
            res.write('{"ok":true, "msg":"注册成功"}');
          }
          break;
        case 'login':
          console.log(users);
          console.log(GET.user);
          if (users[GET.user] == null) {
            res.write('{"ok":false, "msg":"此用户不存在"}');
          } else if(users[GET.user] != GET.pass) {
            res.write('{"ok":false, "msg":"用户名或密码有误"}');
          } else {
            res.write('{"ok":true, "msg":"登录成功"}');
          }
          break;
        default:
          res.write('{"ok":false, "msg": "未知的act"}');
          break;
      }
      res.end()
    } else {
      var f = './www' + url;
      fs.readFile(f, (err, data)=>{
        if(err) {
          res.write('404');
        } else {
          res.write(data)
        }
        res.end()
      })
    }
  })

})

server.listen(8080)


