/*
 * Serve JSON to our client
 */
 // This is simulating the Corticon layer
exports.returnData = function(req, res) {
    var count = req.body.Objects[0].count;
    res.json({
        "Messages": {},
        "Objects": [{
            "newCount": -count,
            "__metadata": {}
        }],
        "__metadataRoot": {}
    });
};