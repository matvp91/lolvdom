/* @jsx vdom.createElement */

import vdom from './vdom';

function App({ text, count = 0 }) {
  return (
    <div>
      <input type="text" />
      <Text text={text} />
      {!count ? (
        <img src="https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif" />
      ) : (
        <img src="https://media1.giphy.com/media/3ohzdSDgGwT5CaWMTu/giphy.gif" />
      )}
      {!!count && <div>I AM COUNT</div>}
    </div>
  );
}

function Text({ text }) {
  return (
    <span>
      <input type="checkbox" />
      nn{text}
    </span>
  );
}

const rootEl = document.getElementById('app');

vdom.render(<App text="Hello first text" />, rootEl);

setTimeout(() => {
  vdom.render(<App text="Hello second text" count={1} />, rootEl);
}, 2000);
