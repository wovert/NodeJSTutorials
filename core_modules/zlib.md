# [zlib](https://nodejs.org/dist/latest-v8.x/docs/api/zlib.html)

> The zlib module provides compression functionality implemented using Gzip and Defalate/Inflate. It can be accessed using.

` const zlib = require('zlib');`

Compressing or decompressing a stream (such as a file) can be accomplished(完成) by piping the source stream data through a zlib stream into a destination stream:

[zlib-1.js](./code/zlib-1.js)
``` NODE
const gzip = zlib.createGzip();
cosnt fs = requrie('fs');
const inp = fs.createReadStream('input.txt');
const out = fs.createWriteStream('input.txt.gz');

inp.pipe(gzip).pipe(out)
```

当浏览器向服务器发起资源请求，比如下载一个js文件，服务器先对资源进行压缩，再返回给浏览器，以此节省流量，加快访问速度。

浏览器通过`HTTP`请求头部里加上`Accept-Encoding`来告诉服务器，“你可以用`gzip`或者`defalte`算法压缩资源并返回给浏览器，浏览器收到数据之后再进行相应的算法进行解压”。

`Accept-Encoding:gzip, deflate`

那么，在 Node 里，是如何对资源进行压缩的呢？答案就是`Zlib`模块

