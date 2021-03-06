# Futures
A simple Future library that can be used in Javascript. This is basically a toy implementation of Promises.

## Motivation
Callbacks, or the Continuation Passing Style (CPS) of coding should be considered an anti-pattern because it constantly changes the flow of control in your program. A CPS funtion will take a callback (continuation), and after executing, will pass the control of the program to that callback. This means that control flow will never be returned to whichever part of your program called the CPS function in the first place!

This is bad for two reasons:
1) It makes code harder to read and reason about, and is the truest, deepest circle of "Callback Hell"
2) It does not compose

It would be better if we could simply use callbacks for event notification instead of execution flow. This is where Futures come into play. Futures let you encapsulate continuations into a composable unit, and register callbacks. The Future will notify any listeners when the continuation has completed. Futures also support composibility by implementing fmap. In doing this, Futures let you compose asynchronous operations.

###### CPS example:
```javascript
    ajax.get('http:someurl.com', function(data, err) {
        // never getting out of here!
        // do something with data
    });
```

###### Future example:
```javascript
    function getF() {
        const f = new Future();

        ajax.get('http:someurl.com', function(data, err) {
            f.complete(data);
        });
        return f;
    }

    let futureVal = getF();

    // pass around futureVal, register event handlers, etc. It will let you know when it has completed.
```

###### Composition with Futures:
```javascript
    const f = Future.unit(5); // creates a new Future which immediately completes with value 5.
    const f2 = f.fmap(x => x * x).fmap(x => x * 2).fmap(x => x + 5); // f2 is a Future which holds a value of 55
```

Error handling is coming soon!
