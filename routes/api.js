/*
 * Serve JSON to our AngularJS client with data from Rollbase
 */

 // This is simulating the Corticon layer
exports.returnData = function(req, res) {
    var count = req.body.Objects[0].count;
    res.json({
        "Messages": {},
        "Objects": [{
            "square": count * count,
            "__metadata": {}
        }],
        "__metadataRoot": {}
    });
};

// This is the NodeJS layer that calls the Corticon layer (being simulated by the returnData method)
exports.reset = function(req, result) {
    var link = 'http://localhost:3000/api/returnData/';
    var hostName = 'localhost:3000';
    var counter = req.body.Objects[0].count;
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
            var square = obj.Objects[0].square;
            result.json({
                'squared': square
            });
        } else {
            console.log('Getting info failed');
            console.log(data);
        }
    });
}