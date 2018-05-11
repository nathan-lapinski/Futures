const Future = require('./Future').Future;
const logF = require('./Future').logF;
// include fs for examples
const fs = require('fs');

// first, let's look at some CPS style code.

const file = fs.readFile('./sample.txt', { encoding: 'utf8'}, (err, data) => {
    console.log('Got the data!', data);
    console.log('now...how the heck do we get out of continuation??');
    //...we don't
});

//


const f1 = new Future();

const sub1 = (val) => {
    console.log('Subscriber one got: ', val);
}

f1.ready(sub1);

logF(f1);

f1.complete(123);

//play with unit

const f2 = Future.unit(456);

f2.ready((v) => console.log('unit subscriber got ', v));

// up to this point, everything has been nice and synchronous. Here is where it becomes async.

// will complete after 1000ms
const f3 = Future.delay(789, 1000);

f3.ready(v => console.log('delayed future has completed with ', v, '!'));

setTimeout(() => {
    console.log('you will see this before the delayed future has completed');
}, 200);

logF(f3);

// now, let's revisit fs, and use Futures to make it better
function readFileF(path) {
    const f = new Future();
    fs.readFile(path, { encoding: 'utf8'}, (err, data) => {
        f.complete(data);
    });
    return f;
}

const fileF = readFileF('./sample.txt');
logF(fileF);

// now, let's get the length of that file

logF(fileF.fmap(c => c.length));

// nice, but let's get even fancier

const lengthFn = c => c.length;
const liftedLengthFn = Future.lift1(lengthFn);

const legnthFuture = liftedLengthFn( readFileF('./sample.txt') );

// ohhh...that was fancy. Pretty soon, we'll be piping things!!

// but first, a little game.
// what's a Future<string> ? That's easy
// what about a Future<Array<string>> ? That's easy too
// what about a Future<Future> ? ...uhhh...

function readDirF(path) {
    const future = new Future();
    fs.readdir(path, (err, files) => {
        if (err) throw err;
        future.complete(files);
    })
    return future;
}

// now...break
const brokenF = readDirF('./').fmap(dirs => readFileF(dirs[0]));
logF(brokenF);