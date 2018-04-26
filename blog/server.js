const express = require('express');
const es = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql = require('mysql');

let app = express();
app.listen(8080);

// 解析 cookie
app.use(cookieParser('s4w949er47815984121941698794u94t4efa49rae9rt'));

// 使用 session
let arr = [];
for(let i=0; i<100000; i++) {
  arr.push('keys_' + Math.random());
}
app.use(cookieSession({
  name: 'blog_sess_id',
  keys: arr,
  maxAge: 20*3600*1000
}));

// post data
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: './www/upload'}).any());

// 配置模版引擎
// 输出什么类型文件爱你
app.set('view engine', 'html');

// 模版文件放在那里
app.set('views', './views');

// 那种模版引擎
app.engine('html', consolidate.ejs);




