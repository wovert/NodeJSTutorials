// 导入  http 模块
const http = require('http');

// 创建服务器
var server = http.createServer(function(req, res){
  switch(req.url) 
  {
    // Chrome 浏览器默认请求 ico 资源
    case '/favicon.ico':
      return;
      break;
    case '/1.html':
      console.log('request 1.html');
      res.write('request 1.html');
      break;
    case '/2.html':
    console.log('request 2.html');
      res.write('request 2.html');
      break;
    default:
      console.log('request 404: ', req.url);
      res.write('404');
      break;
  }
  res.end()
});

const port = 8000;

// 监听8000服务端口
server.listen(8000);
