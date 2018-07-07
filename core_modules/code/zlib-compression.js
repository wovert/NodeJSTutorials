/**
 * 本地文件的gzip压缩
 */

const zlib = require('zlib'); // 导入 zlib 包
const gzip = zlib.createGzip(); // 生成 gzip 压缩对象
const fs = require('fs'); // 导入 fs 文件 报

const inf = fs.createReadStream('./zlib-compression-doc.txt'); // 创建文件读取流并指定读取文件 
const outf = fs.createWriteStream('./zlib-compression-doc.txt.gz'); // 创建文件写入流指定写入文件

inf.pipe(gzip).pipe(outf); // fs 模块的管道方法读取文件流并再用管道方法写入文件流