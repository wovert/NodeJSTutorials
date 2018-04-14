const jade = require('jade');
const fs = require('fs');

// var str = jade.render('html');
// console.log(str);

var strFile = jade.renderFile('./views/1.jade', {pretty: true});
fs.writeFile('./build/jade.html', strFile, (err) => {
    if (!err) {
        console.log('write successfull.');
    } else {
        console.log('write fail.');
    }
});
//console.log(strFile);