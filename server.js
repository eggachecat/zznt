var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var https = require('https');

var io = require('socket.io')(server);

var PORT = 80;
if (process.argv.length === 3) {
    PORT = parseInt(process.argv[2], 10);
}
var privateKey  = fs.readFileSync('assets/www.qqxf8.cn.key', 'utf8');
var certificate = fs.readFileSync('assets/www.qqxf8.cn.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var server = https.createServer(credentials, app);

app.use(express.static('public'));

server.listen(PORT);
console.log('Magic happens on port ' + PORT);