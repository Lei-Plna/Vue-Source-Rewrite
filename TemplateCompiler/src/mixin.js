import { setContentProperty } from './shared/utils';
import { initState } from './state';
import { compilerToRenderFunction } from './compiler';
import { mountComponent } from './lifecycle';

function initMixin(Vue) {
  // Vue初始化方法
  Vue.prototype._init = function (options) {
    var vm = this;
    setContentProperty(vm, '$options', options);  
    initState(vm);

    if (options.el) {
      // 通过原型方法Vue.prototype.$mount挂载元素对象
      vm.$mount(options.el);
    }
  };

  // Vue挂载方法
  Vue.prototype.$mount = function (el) {
    const vm = this,
      options = vm.$options;
    el = typeof el === 'string' ? document.querySelector(el) : el;
    setContentProperty(vm, '$el', el);
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      // 获取到生成虚拟DOM树的Render函数
      const render = compilerToRenderFunction(template);
      setContentProperty(options, 'render', render);
    }

    mountComponent(vm);
  };
}

export { initMixin };
