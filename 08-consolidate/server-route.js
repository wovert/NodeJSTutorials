const express = require('express');
var server = express();

var routeUser = express.Router();
server.use('/user', routeUser);

// http://domain.ltd/user/1.html
routeUser.get('/1.html', (req, res)=>{
  res.send('user1')
});

// http://domain.ltd/user/2.html
routeUser.get('/2.html', (req, res)=>{
  res.send('user2')
});

var articleRouter = express.Router();
server.use('/article', articleRouter);

// http://domain.ltd/article/10001.html
articleRouter.get('/10001.html', (req, res) => {
  res.send('article');
});



server.listen(8080);