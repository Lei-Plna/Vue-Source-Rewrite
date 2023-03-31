import { patch } from "./vdom/patch";

// 执行VM上的update方法
function mountComponent(vm) {
  // 虚拟节点中的render函数
  // 返回一个VNode
  vm._update(vm._render());
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    const vm = this;
    patch(vm.$el, vnode);
  }
}
export {
  mountComponent,
  lifecycleMixin
}