/**
 * A Future is really just pub/sub using functors
 */
function Future() {
    this.subscribers = [];
    this.completed = false;
}

module.exports = {
    Future: Future
};
