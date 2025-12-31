# Copilot instructions

This project contains Hackmud .js scripts. These scripts run in the Hackmud runtime after some syntax preprocessing.

Each script file consists of a single function, like

```js
function(context, args) {
  // script code here
}
```

Notice that the function has no name, and this technically is a syntax error.

The arguments `context` and `args` are provided by the Hackmud runtime. `context` contains information about the current game state, and `args` contains any arguments passed to the script when it is invoked.

The JS environment is restricted. No async, no eval.
We have array spread but no object spread.
