# [zlib](https://nodejs.org/dist/latest-v8.x/docs/api/zlib.html)

> The zlib module provides compression functionality implemented using Gzip and Defalate/Inflate. It can be accessed using.

`const zlib = require('zlib');`

Compressing or decompressing a stream (such as a file) can be accomplished(完成) by piping the source stream data through a zlib stream into a destination stream:

当浏览器向服务器发起资源请求，比如下载一个js文件，服务器先对资源进行压缩，再返回给浏览器，以此节省流量，加快访问速度。

浏览器通过`HTTP`请求头部里加上`Accept-Encoding`来告诉服务器，“你可以用`gzip`或者`defalte`算法压缩资源并返回给浏览器，浏览器收到数据之后再进行相应的算法进行解压”。

`Accept-Encoding:gzip, deflate`

那么，在 Node 里，是如何对资源进行压缩的呢？答案就是`Zlib`模块

[+ gzip compression code file](./code/zlib-compression.js)
``` NODE
const zlib = require('zlib'); // 导入 zlib 包
const gzip = zlib.createGzip(); // 生成 gzip 压缩对象
const fs = require('fs'); // 导入 fs 文件 报

const inf = fs.createReadStream('./zlib-compression-doc.txt'); // 创建文件读取流并指定读取文件 
const outf = fs.createWriteStream('./zlib-compression-doc.txt.gz'); // 创建文件写入流指定写入文件

inf.pipe(gzip).pipe(outf); // fs 模块的管道方法读取文件流并再用管道方法写入文件流
```

[+ gzip uncompression code file](./code/zlib-uncompression.js)

``` NODE
const zlib = require('zlib'); // 导入 zlib 包
const gunzip = zlib.createGunzip(); // 生成 gzip 解压对象
const fs = require('fs'); // 导入 fs 文件包 

const inf = fs.createReadStream('./zlib-compression-doc.txt.gz'); // 创建文件读取流并指定读取文件 
const outf = fs.createWriteStream('./zlib-uncompression-doc.txt'); // 创建文件写入流指定写入文件

inf.pipe(gunzip).pipe(outf); // fs 模块的管道方法读取文件流并再用管道方法写入文件流
```

## 服务端 gzip 压缩

- 服务器判断是否包含accept-encoding 首部，切值为gzip
  - 否：返回未压缩的文件
  - 是：返回gzip压缩后的文件

[+ gzip code in server file](./code/zlib-server-compression-file.js)

## 服务端字符串 gzip 压缩

- 采用了`zlib.gzipSync(str)`对字符串进行gzip压缩

[+ gzip code in server string](./code/zlib-server-compression-string.js)