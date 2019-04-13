/* @jsx vdom.createElement */

import vdom from './vdom';

function App({ text, count = 0 }) {
  return (
    <div>
      <input type="text" />
      <Text text={text} count={count} />
      {!count ? (
        <img src="https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif" />
      ) : (
        <img src="https://media1.giphy.com/media/3ohzdSDgGwT5CaWMTu/giphy.gif" />
      )}
      {!!count && <div>I AM COUNT</div>}
      {[1, 2, 3].map(num => (
        <div>{String(num)}</div>
      ))}
    </div>
  );
}

function Text({ text, count }) {
  return (
    <span>
      <button onClick={console.log}>CLICK ME</button>
      <input type="checkbox" checked={!!count} />
      nn{text}
    </span>
  );
}

const rootEl = document.getElementById('app');

vdom.render(<App text="Hello first text" />, rootEl);

setTimeout(() => {
  vdom.render(<App text="Hello second text" count={1} />, rootEl);
}, 2000);
