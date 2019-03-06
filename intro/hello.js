// How we require modules
var http = require('http');

http.createServer(function(req, res){
  res.writeHead(200); // Status code in header
  res.write('hello, this is dog.'); // response body
  res.end(); // close the connection
}).listen(8080); // listen for conenctions on this port
console.log('Listening on port 8080...');

// Run the server
// $ node hello.js

// $curl http://localhost:8080/




// Known Events
// request
// connection
// close

// Checking for Events

