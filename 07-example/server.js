const fs = require('fs');
const pathLib = require('path');
const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const jade = require('jade');
const multer = require('multer');


var server = express();
var objMulter = multer({
  // 存储目标目录
  dest: './upload/'
});

const PORT = 8080;

server.listen(PORT);

// 解析上传文件爱你
server.use(objMulter.any());
//serer.user(objMulter.single('photo'));

// 1. 解析cookie
server.use(cookieParser('zlkjlsd09a0sfjas912kk32'));

// 2. 使用 session
const arr = [];
for(let i=0; i<1000000; i++) {
  arr.push('keys_' + Math.random());
}
server.use(cookieSession({
  name: 'cg_sess_id',
  keys: arr,
  maxAge: 20*3600*1000
}));

// 3. post 数据
server.use(bodyParser.urlencoded({
  extended: false
}));

// 用户请求
server.post('/', function(req, res, next){
  // console.log(req.query, req.body, req.cookies, req.session);
  
  //  上传文件信息
  console.log(req.files);

  // 1. 获取原始文件扩展名
  const extName = pathLib.parse(req.files[0].originalname).ext;
  const newFile = req.files[0].path + extName;

  // 2. 重命名临时扩展名
  fs.rename(req.files[0].path, newFile, function(err) {
    if (err) {
      res.send('上传失败');
    } else {
      res.send('上传成功');
    }
    res.end();
  });
});
// 4. static 数据
server.use(expressStatic('./www'));