import { observe } from './observe';
import { proxy } from './shared/utils';

function initState(vm) {
  const options = vm.$options;

  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === 'function' ? data.call(vm) : data || {};
  vm._data = data;
  for (let key in data) {
    // 数据代理, 可以通过vm.xxx的方式访问vm._data.xxx
    proxy(vm, '_data', key);
  }
  // 对数据进行观测
  observe(data);
}
export { initState };
