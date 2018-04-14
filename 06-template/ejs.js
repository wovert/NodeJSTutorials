const ejs = require('ejs');

var param = {name: 'wovert'};
var str = ejs.renderFile('./views/1.ejs', param, function(err, data){
    if(err) {
        console.log('Compile error!')
    } else {
        console.log(data);
    }
});