import { isObject, setContentProperty } from '../shared/utils';
import { arrMethods } from './array';
import { defineReactive } from './reactive';

class Observer {
  constructor(data) {
    setContentProperty(data, '__ob__', this);

    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, arrMethods);
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }

  observeArray(arr) {
    arr.forEach((item) => {
      observe(item);
    });
  }
}

function observe(data) {
  if (!isObject(data) || data.__ob__) {
    return data;
  }
  return new Observer(data);
}

export { observe };
