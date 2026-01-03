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

The JS environment is restricted. No `class`, no async, no eval.

We have array spread but no object spread.

Avoid OOP.

We have character limits in the game. Whitespace and newlines don't count. Single line comments `//` don't count either.

Avoid `function` and `const`. Use arrow functions and `let` instead.

(Obviously, avoid `var` too.)
