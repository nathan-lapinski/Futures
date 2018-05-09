/**
 * A Future is really just pub/sub using functors
 */
function Future() {
    this.subscribers = [];
    this.completed = false;
}

Future.prototype.ready = function(cb) {
    if (this.completed) {
        cb();
    } else {
        this.subscribers.push(cb);
    }
}

module.exports = {
    Future: Future
};
