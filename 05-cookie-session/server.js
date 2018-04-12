const express = require('express');
const cookieParser = require('cookie-parser');

const server = express();



// server.use('/', (req, res, next)=>{    
//     res.cookie('root', 'admin', {path: '/', maxAge: 30*24*3600*1000});
//     const msg = 'hello world';
//     console.log(req.cookies);
//     res.send(msg);
//     res.end();
// });

server.use('/a/a.html', (req, res, next)=>{
    
    res.cookie('a_name', 'a', {path: '/a', maxAge: 30*24*3600*1000});
    const msg = 'a.html';
    res.send(msg);
    res.end();
});


server.use('/b/b.html', (req, res)=>{
    res.cookie('b_name', 'b', {path: '/b', maxAge: 30*24*3600*1000});
    res.send('b.html');
    res.end();
});

server.use('/a/c/c.html', (req, res)=>{
    res.cookie('c_name', 'c', {path: '/a/c', maxAge: 30*24*3600*1000});
    res.send('c.html');
    res.end();
});

const sec = 'slkdj54we5s43841s';

server.use('/login', (req, res)=>{
    // 设置密钥
    req.secret = sec;
    
    // signed 签名可以杜绝修改 cookie 值
    // 签名结果:s%3Azhangshan.aOHf9Cdjg%2FXOjeX8yYDkSTB9wR4qNnZe3%2BclWAcX%2Fik
    res.cookie('logininfo', 'zhangshan', {path: '/', maxAge: 30*24*3600*1000, signed: true});
    
    
    res.send('login.html');
    res.end();
});


// 获取 cookies, 可以获取父路由的签名的 cookie
//server.use(cookieParser());

// 传递密钥之后不能在子路由里获取父路由的 cookie
server.use(cookieParser(sec));

server.use('/a/get', (req, res)=>{
    //res.send(req.cookies);

    // 紧返回设置签名cookieParser 签名的 cookie
    res.send(req.signedCookies);
    res.end();
});
server.use('/b/get', (req, res)=>{
    res.send(req.cookies);
    res.end();
});
server.use('/a/c/get', (req, res)=>{
    res.send(req.cookies);
    res.end();
});

server.listen(8080, ()=>{
    console.log('listen to 8080.')
});