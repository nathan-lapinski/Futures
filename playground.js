const Future = require('./Future').Future;
const logF = require('./Future').logF;

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