var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var http = require('http');

var PORT = 80;
if (process.argv.length === 3) {
    PORT = parseInt(process.argv[2], 10);
}

var httpServer = http.createServer(app);


var idiomRouter = require('./app/routers/idiom.router');
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use('/api', bodyParser.urlencoded({extended: false}));
app.use('/api', bodyParser.json({limit: '50mb'}));
app.use('/api/idiom', idiomRouter);
app.use(express.static('public'));
httpServer.listen(PORT);

console.log('httpsServer: Magic happens on port ' + 443);
console.log('httpServer: Magic happens on port ' + PORT);