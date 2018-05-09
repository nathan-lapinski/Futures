/**
 * A Future is really just pub/sub using functors
 */
function Future() {
    this.subscribers = [];
}

module.exports = {
    Future: Future
};
