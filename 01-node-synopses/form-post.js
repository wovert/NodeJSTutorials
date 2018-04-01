// 导入  http 模块
const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const urlM = require('url');

// 创建服务器
var server = http.createServer(function(req, res){
  if (req.url == '/favicon.ico') {
    return;
  }

  // 获取 POST 数据 
  // data 有一段数据到达（很多次）
  var str = '';
  var n = 1;
  req.on('data', function(data){
    str += data;
    console.log(n++ + "次收到数据\n");
    console.log("====================\n");
  })
  // end-数据全部到达（一次）
  req.on('end', function(){
    var POST = qs.parse(str);
    console.log(POST);
  });
  res.end();


});

const port = 8000;

// 监听8000服务端口
server.listen(8000);
