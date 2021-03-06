const express = require('express');
const expressStatic = require('express-static');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();
const users = {
    'id': 'admin',
    'pw': 'admin' 
};

server.use(bodyParser.urlencoded({
     // 扩展模式
    extended: true,

    // post 数据限制, 默认 100k
    // 2 MB
    limit: 2*1024*1024 
}));

server.post('/login', (req, res, next) => {
    const data = req.body;
    if (data.id == users.id && data.pw == users.pw) {
        res.send('{"ok":"true", "message": "登录成功"}');
    } else {
        res.send('{"ok":"false", "message": "登录失败"}');
    }
    next();

})
server.post('/login', (req, res, next) => {
    console.log(req.body , '..........');
    res.end();
})

server.get('/login', (req, res) => {
    const f = './www/login.html';
    fs.readFile(f, 'utf-8', (error, data) => {
        res.send(data);
        res.end()
    });
})
server.use(expressStatic('./www'))

server.listen(8080, () => {
    console.log('Server is listen to 8080...');
});