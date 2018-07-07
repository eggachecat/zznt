var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var http = require('http');
var https = require('https');


var PORT = 80;
if (process.argv.length === 3) {
    PORT = parseInt(process.argv[2], 10);
}
var privateKey  = fs.readFileSync('assets/www.qqxf8.cn.key', 'utf8');
var certificate = fs.readFileSync('assets/www.qqxf8.cn.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);

app.use(express.static('public'));
httpsServer.listen(443);
httpServer.listen(PORT);

console.log('httpsServer: Magic happens on port ' + 443);
console.log('httpServer: Magic happens on port ' + PORT);