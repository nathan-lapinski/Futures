const Future = require('../Future').Future;

describe('Future', () => {

  it('should be callable as a constructor', () => {
    const future = new Future();
    expect(future).toBeDefined();
  });

  it('should maintain a list of registered callbacks', () => {
    const future = new Future();
    expect(future.subscribers).toBeDefined();
  });

});
