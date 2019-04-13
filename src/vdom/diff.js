import renderNode from './renderNode';
import { setAttributes } from './utils';

export default function diff(rootEl, tree, prevTree) {
  // We've got no new vdom tree for this element,
  // let's remove it.
  if (!tree) {
    rootEl.remove();
    return;
  }

  // Either the tree or the previous tree is a string.
  if (typeof tree === 'string' || typeof prevTree === 'string') {
    if (tree !== prevTree) {
      // Re-render the tree, this would catch both of the two options:
      // 1) the new tree is a string and is merely rendered as a DOM text node,
      // 2) the new tree is a node (with potentially children).
      rootEl.replaceWith(renderNode(tree));
    }
    return;
  }

  // The new tree is a totally different tag, re-render!
  if (tree.tagName !== prevTree.tagName) {
    rootEl.replaceWith(renderNode(tree));
    return;
  }

  // At this point, we know that the tree diff at it's root is the same,
  // let's loop over the children and handle any differences there.

  // Update previous children first.
  prevTree.children.forEach((prevChild, i) => {
    diff(rootEl.childNodes[i], tree.children[i], prevChild);
  });

  // Check for new children and render them.
  for (const newChild of tree.children.slice(prevTree.children.length)) {
    rootEl.appendChild(renderNode(newChild));
  }

  // Update attributes.
  setAttributes(rootEl, tree.attrs, prevTree.attrs);
}
