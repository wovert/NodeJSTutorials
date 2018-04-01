// 导入  http 模块
const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const urlM = require('url');

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
        //var urls = urlM.parse(req.url);    
        //GET = qs.parse(urls.query);
        //console.log(urls);
        var urls = urlM.parse(req.url, true);
        /*
        var u = 'https://www.lingyima.com:9090/manage/index.html?a=1&b=2#main';
        console.log(urlM.parse(u));
        Url {
          protocol: 'https:',
          slashes: true,
          auth: null,
          host: 'www.lingyima.com',
          port: 9090,
          hostname: 'www.lingyima.com',
          hash: '#main',
          search: '?a=1&b=2',
          query: 'a=1&b=2',
          pathname: '/manage/index.html',
          path: '/manage/index.html?a=1&b=2',
          href: 'https://www.lingyima.com/manage/index.html?a=1&b=2#main' }
        */  
        console.log(urls.query);
        
        
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
