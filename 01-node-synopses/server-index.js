const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res){
  switch(req.url) 
  {
    case '/favicon.ico':
      return;
      break;
    case '/index.html':
      const f = './www' + req.url;
      fs.readFile(f, function(err, data){
        if (err) {
          res.write(req.url + ' is not exists file.');
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    default:
      console.log('request 404: ', req.url);
      res.write('404');
      res.end();
      break;
  }
});

const port = 8000;
server.listen(8000);
