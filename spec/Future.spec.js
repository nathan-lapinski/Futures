const Future = require('../Future').Future;
const logF = require('../Future').logF;

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

  it('should have an undefined value by default', () => {
    expect(future.value).toBeUndefined();
  });

  describe('ready', () => {
    it('should register a callback if it is not ready', () => {
      const cb = () => {};
      expect(future.subscribers.length).toBe(0);
      expect(future.completed).toBe(false);

      future.ready(cb);

      expect(future.subscribers.length).toBe(1);
    });

    it('should call a subscriber immediately if it has already completed', () => {
      const cb1 = jasmine.createSpy();

      future.completed = true;

      future.ready(cb1);

      expect(cb1).toHaveBeenCalled();
    });

    it('should call a subscriber with the resolved value', () => {
      const cb1 = jasmine.createSpy();

      future.completed = true;
      future.value = 'resolved';

      future.ready(cb1);

      expect(cb1).toHaveBeenCalledWith('resolved');
    });
  });

  describe('complete', () => {
    it('should complete the future with the supplied value', () => {
      expect(future.value).toBeUndefined();
      expect(future.completed).toBe(false);

      future.complete(123);

      expect(future.value).toBe(123);
      expect(future.completed).toBe(true);
    });

    it('should not let the completed value be set more than once. It should be immutable', () => {
      expect(future.value).toBeUndefined();
      expect(future.completed).toBe(false);

      future.complete(123);

      expect(future.value).toBe(123);
      expect(future.completed).toBe(true);

      future.complete(456);

      expect(future.value).toBe(123);
      expect(future.completed).toBe(true);
    });

    it('should call all subscribers with the completed value', () => {
      const f1 = jasmine.createSpy();
      const f2 = jasmine.createSpy();

      future.ready(f1);
      future.ready(f2);

      expect(future.value).toBeUndefined();
      expect(future.completed).toBe(false);

      future.complete(123);

      expect(future.value).toBe(123);
      expect(future.completed).toBe(true);
      expect(f1).toHaveBeenCalledWith(123);
      expect(f2).toHaveBeenCalledWith(123);
    });

    it('should release all subscribers after invoking them', () => {
      const f1 = jasmine.createSpy();

      future.ready(f1);

      expect(future.subscribers.length).toBe(1);

      future.complete(123);

      expect(future.subscribers).toBeNull();
    });
  });

  describe('unit', () => {
    it('should return a new future of the value passed in to it', () => {
      const future = Future.unit(123);
      expect(future.value).toBe(123);
    });

    it('should complete the future immediately', () => {
      const future = Future.unit(123);
      expect(future.completed).toBe(true);
    });
  });

  describe('delay', () => {
    it('should return a future immediately, which is not completed', () => {
      const future = Future.delay(123, 0);
      expect(future).toBeDefined();
      expect(future.completed).toBe(false);
    });

    it('should complete the future after the delay time has passed', (done) => {
      const future = Future.delay(123, 500);
      expect(future).toBeDefined();
      expect(future.completed).toBe(false);
      future.ready((v) => {
        expect(v).toBe(123);
        expect(future.completed).toBe(true);
        done();
      });
    });
  });

  describe('logging utility', () => {
    it('should register a logging callback on the future it receives as an argument', () => {
      const future = jasmine.createSpyObj(Future, ['ready']);
      logF(future);
      expect(future.ready).toHaveBeenCalled();
    });
  });

});
