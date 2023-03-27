function proxy(data, target, key) {
  Object.defineProperty(data, key, {
    get() {
      return data[target][key];
    },
    set(newValue) {
      if (newValue === data[target][key]) {
        return;
      }
      data[target][key] = newValue;
    }
  });
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function setContentProperty(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  });
}

export {
  proxy,
  isObject,
  setContentProperty
}