const boolAttrKeys = [
  'allowfullscreen',
  'allowpaymentrequest',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'readonly',
  'required',
  'reversed',
  'selected',
  'typemustmatch',
];

const isBoolAttr = key => key && boolAttrKeys.includes(key);

const isEventAttr = key =>
  key && key.length > 1 && key[0] === 'o' && key[1] === 'n';

const keyToEventName = key => key.slice(2).toLowerCase();

function removeAttribute(el, key, value) {
  // Event
  if (isEventAttr(key)) {
    if (!value) {
      throw new Error(
        'Cannot remove the event listener because we have none bound to begin with.',
      );
    }
    const eventName = keyToEventName(key);
    el.removeEventListener(eventName, value);
  }
  // bool
  else if (isBoolAttr(key)) {
    el[key] = false;
    el.removeAttribute(key);
  }
  // Other
  else {
    el.removeAttribute(key);
  }
}

function setAttribute(el, key, value, prevValue) {
  // Event
  if (isEventAttr(key)) {
    if (typeof value !== 'function') {
      throw new Error(`The value for ${key} is not a function.`);
    }

    if (prevValue) {
      removeAttribute(el, key, prevValue);
    }

    const eventName = keyToEventName(key);
    el.addEventListener(eventName, value);
  }
  // bool
  else if (isBoolAttr(key)) {
    if (typeof value !== 'boolean') {
      throw new Error(`The value for ${key} is not a boolean.`);
    }
    el[key] = value;
    el.setAttribute(key, value);
  }
  // Other
  else {
    el.setAttribute(key, value);
  }
}

export function setAttributes(el, attrs, prevAttrs = {}) {
  // Let's get rid of old attributes first.
  for (const [key, value] of Object.entries(prevAttrs)) {
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
