var fs = require('fs');
var http = require('http');
var zlib = require('zlib');
var filepath = './index.html';

var server = http.createServer(function(req, res){
  var acceptEncoding = req.headers['accept-encoding'];
  var gzip;

  if (acceptEncoding.indexOf('gzip') !== -1) {
    gzip = zlib.createGzip();
    
    res.writeHead(200, {
      // 告诉浏览器，文件被 gzip 压缩过
      'Content-Encoding': 'gzip'
    });
    fs.createReadStream(filepath).pipe(gzip).pipe(res);
  } else {
    fs.createReadStream(filepath).pipe(res);
  }
});

server.listen('3000');