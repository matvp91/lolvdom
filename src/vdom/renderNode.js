export default function renderNode(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.tagName);

  for (const [key, value] of Object.entries(node.attrs)) {
    el.setAttribute(key, value);
  }

  for (const child of node.children) {
    el.appendChild(renderNode(child));
  }

  return el;
}
