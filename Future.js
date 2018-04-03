/**
 * A Future is really just pub/sub using functors
 */
function Future() {
    this.subscribers = [];
    this.value = undefined;
    this.completed = false;
}

Future.prototype.subscribe = function(subscriber) {
    if (this.completed) subscriber(this.value);
    else this.subscribers.push(subscriber);
}

Future.prototype.complete = function(value) {
    if (this.completed) {
        console.log('This Future has already completed');
    }

    this.completed = true;
    this.value = value;

    this.subscribers.forEach(sub => sub(this.value));

    this.subscribers = [];
}

Future.prototype.delay = function(val, delay) {
    const f = new Future();
    setTimeout(() => {
        f.complete(val);
    }, delay);
    return f;
}

// Simply wraps a value in a Future
// unit :: Val -> Future<Val>
Future.prototype.unit = function(value) {
    const f = new Future();
    f.complete(value);
    return f;
}

Future.prototype.fmap = function(fn) {
    const f = new Future();
    this.subscribe((val) => {
        f.complete(fn(val));
    });
    return f;
}

Future.prototype.flatten = function() {
    const f = new Future();
    this.subscribe((future2) => {
        future2.subscribe((val) => {
            f.complete(val);
        });
    });
    return f;
}

Future.prototype.flatMap = function(fn) {
    return this.fmap(fn).flatten();
}

Future.lift = function(fn) {
    return (future) => future.fmap(fn);
}

// Utilities
function traceFuture(future) {
    future.subscribe(val => console.log(val));
}

// examples
const delayedValueFunc = function(value='default val', delay=1000) {
  const f = new Future();
  setTimeout(() => {
    f.complete(value);
  }, delay);
  return f;
}

traceFuture(delayedValueFunc());

traceFuture(new Future().unit('I complete immediately'));

traceFuture(new Future().unit(5).fmap(x => x*x).fmap(y => y*2));

const square = (x) => x * x;

const liftedSquare = Future.lift(square);

traceFuture(liftedSquare(new Future().unit(10)));
