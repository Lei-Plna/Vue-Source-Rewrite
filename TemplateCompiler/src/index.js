import { initMixin } from "./mixin";
// 创建Vue构造函数
class Vue {
  constructor(options) {
    this._init(options);
  }
}

// 通过插件化的方式给Vue添加原型方法
initMixin(Vue);

export default Vue;