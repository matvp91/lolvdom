import compose from './compose';
import diff from './diff';
import renderNode from './renderNode';

const prevTreeSymbol = Symbol('vdomPrevTree');

export default function render(vnode, rootEl) {
  const tree = compose(vnode);
  const prevTree = rootEl[prevTreeSymbol];
  rootEl[prevTreeSymbol] = tree;

  const domStructure = renderNode(tree);

  if (!prevTree) {
    rootEl.appendChild(domStructure);
    return;
  }

  diff(rootEl.firstChild, tree, prevTree);
}
