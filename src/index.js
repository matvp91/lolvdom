/* @jsx vdom.createElement */

import vdom from './vdom';

function App({ counter, increment }) {
  let style = '';
  if (counter > 5) {
    style = 'color: red';
  }
  if (counter > 10) {
    style = 'color: green';
  }

  return (
    <div>
      <div style={style}>{String(counter)}</div>
      <button onClick={increment}>+</button>
      {counter > 5 && <div>I am bigger than 5</div>}
    </div>
  );
}

const initialState = {
  counter: 0,
};
let state = { ...initialState };

function increment() {
  setState({
    counter: state.counter + 1,
  });
}

function render() {
  vdom.render(
    <App {...state} increment={increment} />,
    document.getElementById('app'),
  );
}
render();

const setState = newState => {
  state = {
    ...state,
    ...newState,
  };
  render();
};
