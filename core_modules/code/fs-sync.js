const fs = require('fs');
var data;

try {
  data = fs.readFileSync('./index.html', 'utf8');
  console.log('文件内容：' + data);
} catch(err) {
  console.error('读取文件出错：' + err.message);
}