/**
 * A Future is really just pub/sub using monads
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