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

  describe('ready', () => {
    it('should register a callback if it is not ready', () => {
      const cb = () => {};
      expect(future.subscribers.length).toBe(0);
      expect(future.completed).toBe(false);

      future.ready(cb);

      expect(future.subscribers.length).toBe(1);
    });

    it('should call a subscriber immediatle if it has already completed', () => {
      const cb1 = jasmine.createSpy();

      future.completed = true;

      future.ready(cb1);

      expect(cb1).toHaveBeenCalled();

    });
  });

});
