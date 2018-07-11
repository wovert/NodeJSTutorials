var fs = require('fs');

fs.mkdir('./tmpDir', function(err) {
  if(err) throw err;
  console.log('目录创建成功');
})