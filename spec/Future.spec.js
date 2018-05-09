const Future = require('../Future').Future;

describe('Future', () => {
  let future;

  beforeEach(() => {
    future = new Future();
  });

  it('should be callable as a constructor', () => {
    expect(future).toBeDefined();
  });

  it('should maintain a list of registered callbacks', () => {
    expect(future.subscribers).toBeDefined();
  });

  it('should not be completed, by default', () => {
    expect(future.completed).toBe(false);
  });

});
