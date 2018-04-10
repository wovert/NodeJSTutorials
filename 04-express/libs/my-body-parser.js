const qs = require('querystring');

module.exports = function(req, res, next){
    return function(){
        var str = '';
        req.on('data', function(data) {
            str += data;
        });
        req.on('end', function() {
            req.body = qs.parse(str);
            next();
        });
    }
}
