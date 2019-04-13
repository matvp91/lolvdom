export default function compose(node) {
  if (node.composeComponent) {
    const composed = node.composeComponent(node.attrs);

    composed.children = composed.children.map(compose);

    return composed;
  }

  return node;
}
