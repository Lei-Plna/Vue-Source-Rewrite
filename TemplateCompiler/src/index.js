import { lifecycleMixin } from "./lifecycle";
import { initMixin } from "./mixin";
import { renderMixin } from "./vdom";
// 创建Vue构造函数
class Vue {
  constructor(options) {
    this._init(options);
  }
}

// 通过插件化的方式给Vue添加原型方法
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;