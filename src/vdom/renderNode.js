import { setAttributes } from './utils';

export default function renderNode(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.tagName);

  setAttributes(el, node.attrs);

  for (const child of node.children) {
    el.appendChild(renderNode(child));
  }

  return el;
}
