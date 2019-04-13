export default function createElement(tagName, attrs, ...children) {
  const element = {};

  element.tagName = tagName;

  if (attrs) {
    element.attrs = attrs;
  } else {
    element.attrs = {};
  }

  // If the component is a function, we must first compose it at render.
  if (typeof tagName === 'function') {
    const createComponent = tagName;
    return { composeComponent: () => createComponent(attrs) };
  }

  const childrenArray = [];
  children.forEach(child => {
    if (!child) {
      return;
    }
    if (Array.isArray(child)) {
      const mappedChildren = child;
      mappedChildren.forEach(child => childrenArray.push(child));
      return;
    }
    childrenArray.push(child);
  });
  element.children = childrenArray;

  return element;
}
