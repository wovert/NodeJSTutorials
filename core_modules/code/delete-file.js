var fs = require('fs');


// 异步删除
fs.unlink('./fileForWrite1.txt', function(err) {
  if(err) throw err;
  console.log('文件删除成功');
});

// 同步删除
fs.unlinkSync('./fileForwrite1.txt');