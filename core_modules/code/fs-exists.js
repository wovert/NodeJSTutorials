var fs = require('fs');

fs.access('./index.html', function(err){
  if(err) {
    console.log('找不到文件 index.html');      
    return;  
  }
  console.log('index.html存在');
});

fs.access('./fileForRead2.txt', function(err){
    if(err) {
      console.log('找不到文件 fileForRead2.txt');      
      return;  
    }
    console.log('fileForRead2.txt存在');
});