const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const server = express();

var arr=[];
for(var i=0; i<100000; i++) {
    arr.push('sig_' + Math.random());
}

server.use(cookieParser());
server.use(cookieSession({
    name: 'sess',
    maxAge: 1000*3600*2, // 2个小时
    // 加密密钥
    keys:  arr
}));


server.use('/favicon.ico', (req, res)=>{
    return;
})
server.use('/', (req, res)=>{
    if (req.session['count'] == null) {
        req.session['count'] = 1;
    } else {
        req.session['count'] = req.session['count'] + 1;
    }
    console.log(req.session);
    res.send(req.session);
    res.end();
});




server.listen(8080, ()=>{
    console.log('listen to 8080.')
});