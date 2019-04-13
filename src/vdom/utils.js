function removeAttribute(el, key, prevValue) {
  if (/^on/.test(key)) {
    const eventName = key.slice(2).toLowerCase();
    el.removeEventListener(eventName, prevValue);
    return;
  }

  if (typeof prevValue === 'boolean') {
    el[key] = false;
  }

  el.removeAttribute(key);
}

function setAttribute(el, key, value, prevValue) {
  if (/^on/.test(key)) {
    const eventName = key.slice(2).toLowerCase();
    el.removeEventListener(eventName, prevValue);
    el.addEventListener(eventName, value);
    return;
  }

  el.setAttribute(key, value);

  if (typeof value === 'boolean') {
    el[key] = value;
  }
}

export function setAttributes(el, attrs, prevAttrs = {}) {
  // Let's get rid of old attributes first.
  for (const [key, value] in prevAttrs) {
    if (!(key in attrs)) {
      removeAttribute(el, key, value);
    }
  }

  for (const [key, value] of Object.entries(attrs)) {
    if (prevAttrs[key] === value) {
      continue;
    }

    setAttribute(el, key, value, prevAttrs[key]);
  }
}
