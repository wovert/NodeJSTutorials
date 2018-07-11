var fs = require('fs');
try {
  fs.writeFileSync('./helloworld.txt', 'hello world', 'utf8');
  console.log('文件写入成功');  
} catch(err) {
  throw err;
}