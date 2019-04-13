import renderNode from './renderNode';

export default function diff(rootEl, tree, prevTree) {
  if (!tree) {
    rootEl.remove();
    return;
  }

  if (typeof tree === 'string' || typeof prevTree === 'string') {
    if (tree !== prevTree) {
      rootEl.replaceWith(renderNode(tree));
    }
    return;
  }

  if (tree.tagName !== prevTree.tagName) {
    rootEl.replaceWith(renderNode(tree));
    return;
  }

  // Update previous children first.
  prevTree.children.forEach((prevChild, i) => {
    diff(rootEl.childNodes[i], tree.children[i], prevChild);
  });

  // Check for new children.
  for (const newChild of tree.children.slice(prevTree.children.length)) {
    rootEl.appendChild(renderNode(newChild));
  }

  // Update attributes.
  for (const [key, value] of Object.entries(tree.attrs)) {
    rootEl.setAttribute(key, value);
  }

  // Remove unused attributes.
  for (const key in prevTree.attrs) {
    if (!(key in tree.attrs)) {
      rootEl.removeAttribute(k);
    }
  }
}
