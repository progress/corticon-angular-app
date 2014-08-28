/*
 * Serve JSON to our AngularJS client with data from Rollbase
 */

var counter = 0;

var interval = setInterval(increment, 1000);
function increment () {
    counter++;
}
exports.count = function(req, res) {
    res.json({
        count: counter
    });
};
exports.reset = function(req, res) {
    counter = req.body.newCount;
    console.log(counter);
    res.json(true);
};

