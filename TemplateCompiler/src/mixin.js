import { setContentProperty } from './shared/utils';
import { initState } from './state';

function initMixin(Vue) {
  // Vue挂载方法
  Vue.prototype.$mount = function (el) {
    const vm = this;
    el = typeof el === 'string' ? document.querySelector(el) : el;
    setContentProperty(vm, '$el', el);
  };
  // Vue初始化方法
  Vue.prototype._init = function (options) {
    var vm = this;
    vm.$options = options;
    initState(vm);

    if (options.el) {
      // 通过原型方法Vue.prototype.$mount挂载元素对象
      vm.$mount(options.el);
    }
  };
}

export { initMixin };
