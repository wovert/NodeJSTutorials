var fs = require('fs');
var path = require('path');

var getFileInDir = function(dir) {
  var results = [ path.resolve(dir) ];

  // path.resolve(dir):E:\lingyima\development\NodeJSTutorials\core_modules
  //console.log('path.resolve(dir):' + path.resolve(dir));


  // 同步读取目录
  var files = fs.readdirSync(dir, 'utf8');
  // console.log(files);

  // 遍历目录文件
  files.forEach(function(file){
    file = path.resolve(dir, file);
    
    // 查看文件状态信息
    var stats = fs.statSync(file);

    // 是否为文件
    if(stats.isFile()) {
      results.push(file);
    
    // 是否为目录
    } else if(stats.isDirectory()) {
      results = results.concat(getFileInDir(file));
    }
  });

  return results;
};

var files = getFileInDir('../');
console.log(files);