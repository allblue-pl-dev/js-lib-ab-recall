
var Recall = require('./Lib/Recall.js');


exports.Lib = require('./lib.js');

exports.new = function(fn, name) {
    return new Recall.Class(fn, name);
};

exports.setWaitTime = function(wait_time) {
    Recall.SetWaitTime(wait_time);
};
