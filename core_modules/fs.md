## 文件读取

### 普通读取

- [同步读取](./code/fs-sync.js)：`fs.readFileSync(FILE_PATH, encoding)`

``` node
const fs = require('fs');
var data;

try {
  data = fs.readFileSync('./index.html', 'utf8');
  console.log('文件内容：' + data);
} catch(err) {
  console.error('读取文件出错：' + err.message);
}
```

- [异步读取](./code/fs-async.js): `fs.readFile(FILE_PATH, encoding)`

``` node
const fs = require('fs');
var data;

data = fs.readFile('./index.html', 'utf8', function(err, data){
  if(err) {
    return console.error('读取文件出错：' + err.message);
  }
  console.log('文件内容：' + data);
});
```

### 通过文件流读取

[适合读取大文件](./code/fs-read-stream.js)

``` node
var fs = require('fs');
var readStream = fs.createReadStream('./index.html', 'utf8');

readStream.on('data', function(chunk){
  console.log('读取文件：' + chunk);
})
.on('error', function(err){
  console.log('出错：' + err.message);
})
.on('end', function(){
  console.log('没有数据了');
})
.on('close', function(){
  console.log('已经关闭了');
})
```

## 文件写入

以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；

- [异步写入](./code/fs-sync-write.js) `fs.writeFile('./fileForWrite.txt', 'hello world', 'utf8', function(err){});`

``` node
var fs = require('fs');

fs.writeFile('./helloworld.txt', 'hello world', 'utf8', function(err){
  if(err) throw err;
  console.log('文件写入成功');
})
```

- [同步写入](./code/fs-async-write.js) `fs.writeFileSync('./fileForWrite.txt', 'hello world', 'utf8');` 推荐 try...catch

``` node
var fs = require('fs');
try {
  fs.writeFileSync('./helloworld.txt', 'hello world', 'utf8');
  console.log('文件写入成功');  
} catch(err) {
  throw err;
}
```

### 通过文件流写入


[同步写入](./code/fs-stream-write.js)

``` node
var fs = require('fs');
var writeStream = fs.createWriteStream('./fileForWrite1.txt', 'utf8');

writeStream
    .on('close', function(){  // 已经关闭，不会再有事件抛出
        console.log('已经关闭');
    });

writeStream.write('hello');
writeStream.write('world');
writeStream.end('');
```

### 相对底层的接口

> fs.write(fd, buffer, offset, length[, position], callback) fs.write(fd, data[, position[, encoding]], callback) fs.writeSync(fd, buffer, offset, length[, position]) fs.writeSync(fd, data[, position[, encoding]])

- fd：写入的文件句柄。
- buffer：写入的内容。
- offset：将buffer从offset位置开始，长度为length的内容写入。
- length：写入的buffer内容的长度。
- position：从打开文件的position处写入。
- callback：参数为 (err, written, buffer)。written表示有xx字节的buffer被写入。

备注：fs.write(fd, buffer, offset, length[, position], callback)跟fs.write(fd, data[, position[, encoding]], callback)的区别在于：后面的只能把所有的data写入，而前面的可以写入指定的data子串？

## 文件是否存在

`fs.exists()`已经是deprecated状态，现在可以通过下面代码判断文件是否存在。

``` node
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
```

[+ file exists code](./code/fs-exists.js)

fs.access()除了判断文件是否存在（默认模式），还可以用来判断文件的权限。

备忘：fs.constants.F_OK等常量无法获取（node v6.1，mac 10.11.4下，fs.constants是undefined）

## 创建目录

异步版本（如果目录已存在，会报错）[+ Asynchromous code](./code/mkdir-async.js)
``` node
var fs = require('fs');

fs.mkdir('./hello', function(err){
    if(err) throw err;
    console.log('目录创建成功');
});
```

同步版本: [+ Asynchromous code](./code/mkdir-sync.js)
``` node
var fs = require('fs');
fs.mkdirSync('./tmpDirSync');

// fs.mkdirSync(path[, mode])
var fs = require('fs');

try{
    fs.mkdirSync('hello');
    console.log('创建目录成功');
}catch(e){
    throw e;
}

```

## 删除文件

[+ delete file code](./code/delete-file.js)
``` node
var fs = require('fs');

fs.unlink('./fileForUnlink.txt', function(err){
    if(err) throw err;
    console.log('文件删除成功');
});

fs.unlinkSync('./fileForUnlink2.txt');
```

## 遍历目录

同步版本，注意：fs.readdirSync()只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。

[+ each directionary](./code/each-dir.js)

``` NODE
// fs.readdirSync(path[, options])

var fs = require('fs');
var path = require('path');

var getFilesInDir = function(dir){

  var results = [ path.resolve(dir) ];
  var files = fs.readdirSync(dir, 'utf8');

  files.forEach(function(file){

    file = path.resolve(dir, file);

    var stats = fs.statSync(file);

    if(stats.isFile()){
      results.push(file);
    }else if(stats.isDirectory()){
      results = results.concat( getFilesInDir(file) );
    }
  });

  return results;
};

var files = getFilesInDir('../');
console.log(files);
```

异步版本：（TODO）

## 文件重命名

[+ file rename](./code/fs-rename.js)
``` node
// fs.rename(oldPath, newPath, callback)
var fs = require('fs');

fs.rename('./tmpDir', './tmpDirRename', function(err){
    if(err) throw err;
    console.log('重命名成功');
});

fs.renameSync(tmpDirRename, tmpDir)
```

## 监听文件修改

fs.watch() 比 fs.watchFile() 高效很多(why)

fs.watchFile()

实现原理：轮询。每个一段时间检查文件是否发生变化。在不同平台上表现基本是一致的。

[+ watch file code](./code/fs-watch.js)

## 修改所有者

## 修改权限

## 获取文件状态

## 访问/权限检测

## 文件打开/关闭

## 文件读取（底层）

## 追加文件内容

## 文件内容截取

## 修改文件属性（时间）

## 创建文件链接

## 创建临时目录

## 找出软连接指向的真实路径

## 真实路径

## 删除目录

## 缓冲区内容写到磁盘

## 待确认


