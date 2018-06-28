var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var PORT = 80;
if (process.argv.length === 3) {
    PORT = parseInt(process.argv[2], 10);
}


app.use(express.static('public'));

server.listen(PORT);
console.log('Magic happens on port ' + PORT);