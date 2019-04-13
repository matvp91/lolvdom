# lolvdom 🤯

A quick and dirty implementation of virtual dom, not to be taken seriously. Nonetheless, it should give you a basic idea of how virtual dom diffing works (and that was my main goal to begin with).

* Does somewhat of a decent job at diffing virtual trees.
* Wannabe React-like component structure (components are merely functions, nothing fancy).
* Dirty implementation of "onAnyEvent".
* Renders lists, but does not uniquely identify list children which would f*ck up diffing (fyi, think of React's `key` reserved prop). Try `{arr.map(item => <div>{item}</div>)}` at own risk.
* Only works with nodes & text (strings), does not cast any other value to it's textual representation (yet?). See `{String(count)}` instead of `{count}` but that would be an easy fix.

```javascript
/* @jsx vdom.createElement */

import vdom from './vdom';

function App({ count, increment }) {
  return ( 
    <div>
      <b>{String(count)}</b>
      <button onClick={increment}>Go up!</button>
    </div>
  );
}

let state = {
  count: 0,
};

function increment() {
  state = {
    ...state,
    count: state.count + 1,
  };
  render();
}

function render() {
  vdom.render(
    <App count={state.count} increment={increment} />,
    document.getElementById('app'),
  );
}

render();
```
