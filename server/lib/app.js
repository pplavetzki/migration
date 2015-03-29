/**
 * Created by paul on 3/29/15.
 */
///<reference path="../../typings/node/node.d.ts"/>
///<reference path="../../typings/express/express.d.ts"/>
var express = require('express');
var cisco = require('./config/cisco');
var app = express();
app.use('/config/cisco', cisco);
var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=app.js.map