
var abRecall = require('./index');


var r1 = abRecall.new(function(args_array) {
    console.log('r1:', args_array);
});


/* First Batch */
r1.call(1);
r1.call(2);
r1.call(3);

setTimeout(function() {
    r1.call(4);
    r1.call(5);
    r1.call(6);
}, 90);

/* Second Batch */
setTimeout(function() {
    r1.call(4);
    r1.call(5);
    r1.call(6);
}, 200);


var r2 = abRecall.new(function(args_array) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('r2:', args_array);
            resolve();
            // reject(new Error('Ups!'));
        }, 3000);
    });
});

/* First Batch */
r2.call(1);
r2.call(2);
r2.call(3);

setTimeout(function() {
    r2.call(4);
    r2.call(5);
    r2.call(6);
}, 90);

/* Second Batch */
setTimeout(function() {
    r2.call(4);
    r2.call(5);
    r2.call(6);
}, 1000);


// process.on('exit', function() {
//     abSync.check();
// });
