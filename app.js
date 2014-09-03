
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);

// JSON API
app.post('/api/returnData', api.returnData);

// Socket.io Communication
io.sockets.on('connection', function(socket) {
socket.on('send:reset', function(data) {
        var link = 'http://localhost:' + (process.env.PORT || 8080) + '/api/returnData/';
        var hostName = 'YOUR HOST NAME HERE';
        var counter = data.count;
        var jsonRequest = JSON.stringify({
            "Objects": [{
                "count": counter
            }]
        });
        var contentLength = jsonRequest.length;
        var request = require('request');
        var querystring = require('querystring');
        request({
            headers: {
                'content-length': contentLength,
                'content-type': 'application/json',
                'connection': 'Keep-Alive',
                'user-agent': 'NodeJS client',
                'host': hostName,
                'dsName': 'PROCESS NAME HERE'
            },
            url: link,
            body: jsonRequest,
            method: 'POST'
        }, function(err, res, body) {
            if (res.statusCode < 400) {
                var obj = JSON.parse(body);
                var newCount = obj.Objects[0].newCount;
                io.sockets.emit('send:updateCount', {
                    count: newCount
                });
                console.log('DATA' + data);
            }
        });
    });
    });

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
