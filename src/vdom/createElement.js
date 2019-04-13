export default function createElement(tagName, attrs, ...children) {
  if (!attrs) {
    attrs = {};
  }

  if (typeof tagName === 'function') {
    return { composeComponent: () => tagName(attrs) };
  }

  const pureChildren = children.filter(child => !!child);

  return { tagName, attrs, children: pureChildren };
}
