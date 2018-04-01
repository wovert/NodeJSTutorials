const fs = require('fs');

// 读文件函数
readFile = './www/file.txt';
fs.readFile(readFile, function(err, data){
  if (err) {
    console.log(readFile + ' is not exists.');
  } else {
    // 默认输出二进制数据，buffering
    console.log(data);

    // 输出字符串
    console.log(data.toString());
  }
});

