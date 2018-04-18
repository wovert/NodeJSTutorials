const jade = require('jade');
const fs = require('fs');

var strFile = jade.renderFile('./views/index.jade', {pretty: true});
fs.writeFile('./build/index.html', strFile, (err) => {
    if (!err) {
        console.log('write successfull.');
    } else {
        console.log('write fail.');
    }
});
//console.log(strFile);