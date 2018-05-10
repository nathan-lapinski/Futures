/**
 * A Future is really just pub/sub with composition
 */
function Future() {
    this.subscribers = [];
    this.completed = false;
    this.value = undefined;
}

Future.prototype.ready = function(cb) {
    if (this.completed) {
        cb(this.value);
    } else {
        this.subscribers.push(cb);
    }
}

Future.prototype.complete = function(val) {
    if (this.completed) {
        console.log('Future: Future has already been completed');
        return;
    }
    this.value = val;
    this.completed = true;

    this.subscribers.forEach(f => f(this.value));

    this.subscribers = null;
}

// unit :: Value -> Future<Value>
Future.unit = function(val) {
    const future = new Future();
    future.complete(val);
    return future;
}

// delay :: (Value, Number) -> Future<Value>
Future.delay = function(val, ms) {
    const future = new Future();
    setTimeout(() => {
        future.complete(val);
    }, ms);
    return future;
}

function logF(future) {
    future.ready(v => console.log('Future log: ', v));
}

module.exports = {
    Future: Future,
    logF: logF
};
