const jade = require('jade');
const fs = require('fs');

var strFile = jade.renderFile('./views/9.jade', {pretty: true, name: 'blue', data: [10,20,30], a: 100, b:200, json: {background: 'red',color: '#000'}, arr: ['hover','visited']});
fs.writeFile('./build/jade9.html', strFile, (err) => {
    if (!err) {
        console.log('write successfull.');
    } else {
        console.log('write fail.');
    }
});