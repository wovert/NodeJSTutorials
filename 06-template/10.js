const jade = require('jade');
const fs = require('fs');

var strFile = jade.renderFile('./views/10.jade', {pretty: true, content: '<h2>你好</h2><div></div>'});
fs.writeFile('./build/jade10.html', strFile, (err) => {
    if (!err) {
        console.log('write successfull.');
    } else {
        console.log('write fail.');
    }
});