import compose from './compose';
import diff from './diff';
import renderNode from './renderNode';

const SYMBOL_PREV_TREE = Symbol();

export default function render(vnode, rootEl) {
  // Create the tree, function components -> proper layout.
  const tree = compose(vnode);

  const prevTree = rootEl[SYMBOL_PREV_TREE];
  rootEl[SYMBOL_PREV_TREE] = tree;

  // If we don't have a previous vdom tree yet, it's the first render,
  // simply add the nodes to the DOM instead.
  if (!prevTree) {
    rootEl.appendChild(renderNode(tree));
    return;
  }

  // We've got a previous vdom tree, let's diff it instead.
  // Diffing will apply the minimal amount of patches in order to update the DOM.
  diff(rootEl.firstChild, tree, prevTree);
}
