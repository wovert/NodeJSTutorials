// 导入  http 模块
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

// 创建服务器
var server = http.createServer(function(req, res){
  switch(req.url) 
  {
    // Chrome 浏览器默认请求 ico 资源
    case '/favicon.ico':
      return;
      break;
    
    default:
      console.log(req.url);
      if (req.url.indexOf('?')) {
        var arr = req.url.split('?');
        if (arr.length == 2) {
          var url = arr[0];
          var GET = qs.parse(arr[1]);
          console.log(GET);
          //res.write(GET.toString());
        }
      } else {
        const f = './www/form.html';
        fs.readFile(f, function(err, data){
          if(err) {
            res.write('None files.');
          } else {
            res.write(data);
          }
        });
      }
      res.end();
      break;
    }
});

const port = 8000;

// 监听8000服务端口
server.listen(8000);
