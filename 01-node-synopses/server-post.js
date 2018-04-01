const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const urlM = require('url');

var server = http.createServer((req, res) => {
  if (req.url == '/favicon.ico') {
    return;
  }
  // GET
  var obj = urlM.parse(req.url, true);
  var urlPath = obj.pathname;
  const GET = obj.query;

  // POST
  var str = '';
  req.on('data', (data)=>{
    str += data;
  });

  var POST;
  req.on('end', ()=>{
    console.log(str);
    POST = qs.parse(str);

    console.log('get:', GET);
    console.log('post:', POST);



    // 文件请求
    console.log(urlPath);
    urlPath = urlPath != '/' ? urlPath : '/index.html';
    var f = './www' + urlPath;
    console.log(f);
    fs.readFile(f, (err, data)=>{
      if(err) {
        res.write('404');
      } else {
        res.write(data);
      }
      res.end();
    });
  })
  
  


});

server.listen(8000);