const express = require('express');
const cookieParser = require('cookie-parser');

const server = express();

server.use(cookieParser());

server.use('/', (req, res, next)=>{    
    res.cookie('root', 'admin', {path: '/', maxAge: 30*24*3600*1000});
    const msg = 'hello world';
    console.log(req.cookies);
    res.send(msg);
    res.end();
});

server.use('/setcookie/a.html', (req, res, next)=>{
    
    res.cookie('name', 'bob', {path: '/setcookie', maxAge: 30*24*3600*1000});
    const msg = 'a.html';
    res.send(msg);
});


server.use('/setcookie/b.html', (req, res)=>{
    console.log(req.cookies);
    res.send('b.html');
    res.end();
});

server.use('/setcookie/dir/c.html', (req, res)=>{
    console.log(req.cookies);
    res.send('c.html');
    res.end();
});


server.listen(8080, ()=>{
    console.log('listen to 8080.')
});