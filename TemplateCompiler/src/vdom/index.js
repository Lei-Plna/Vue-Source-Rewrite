import { createElement, createTextVnode } from "./vnode";
// render相关的Mixin
function renderMixin(Vue) {
  Vue.prototype._render = function() {
    const vm = this,
      render = vm.$options.render,
      vnode = render.call(vm);
    return vnode;
  }

  Vue.prototype._c = function() {
    return createElement(...arguments);
  }

  Vue.prototype._s = function(value) {
    if (value  === null) {
      return '';
    }
    return typeof value === 'object' ? JSON.stringify(value) : value;
  }

  Vue.prototype._v = function(text) {
    return createTextVnode(text);
  }
}

export {
  renderMixin
}