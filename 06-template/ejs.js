const ejs = require('ejs');

var param = {
name: 'wovert', 
type: 'admin',
json: { arr:  [
    {
        'user': 'blue',
        'pwd': 'bluepw'
    },
    {
        'user': 'green',
        'pwd': 'greenpw'
    },
    {
        'user': 'redb',
        'pwd': 'redpw'
    }]
}};
var str = ejs.renderFile('./views/1.ejs', param, function(err, data){
    if(err) {
        console.log('Compile error!')
    } else {
        console.log(data);
    }
});