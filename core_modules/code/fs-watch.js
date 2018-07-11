var fs = require('fs');

var options = {
  persistent: true, // 默认就是 true
  interval: 2000 // 多久检查一次
};

fs.watch('./fileForWatch.txt', options, function(cur, prev){
  console.log('修改时间为:' + cur);    
});