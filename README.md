# Futures
A simple Future library that can be used in Javascript

## Motivation
Callbacks, or the Continuation Passing Style (CPS) of coding is bad because it constantly changes the flow of control in your program. A CPS funtion will take a callback (continuation), and after executing, will pass the control of the program to that callback. This means that control flow will never be returned to whichever part of your program called the CPS function in the first place!

This is bad for two reasons:
1) It makes code harder to read and reason about, and is the truest, deepest circle of "Callback Hell"
2) It does not compose

It would be better if we could simply use callbacks for event notification instead of execution flow. This is where Futures come into play. Futures let you encapsulate continuations into a composable unit which used events to notify any listeners when the continuation has completed. In doing this, futures let you compose asynchronous operations without altering the flow of control in your program.

###### CPS example:
```javascript
    ajax.get('http:someurl.com', function(data, err) {
        // never getting out of here!
        // do something with data
    });
```

###### Future example:
```javascript
    let f = new Future();

    ajax.get('http:someurl.com', function(data, err) {
        f.complete(data);
    });

    // pass around f, register event handlers, etc. It will let you know when it has completed.
```