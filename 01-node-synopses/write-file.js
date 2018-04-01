const fs = require('fs');

// 读文件函数
writeFile = './www/write.txt';
content = 'hello world'
fs.writeFile(writeFile, content, function(err){
  if (err) {
    console.log(readFile + ' is not exists.');
  }
});

