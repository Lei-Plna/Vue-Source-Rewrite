// 重写数组方法的方法集合
const ArrayMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reserve',
  'sort',
  'splice',
];

// 获取数组原型对象
const originArrMethods = Array.prototype,
  // 创建一个新的对象, 该对象的原型指向Array.prototype
  arrMethods = Object.create(originArrMethods);

// 重写数组方法
ArrayMethods.forEach((method) => {
  arrMethods[method] = function (...args) {
    // 1. 执行原生方法
    const result = originArrMethods[method].apply(this, args);
    // 2. 获取新增的元素
    let inserted;
    // 3. 获取新增元素的类型
    const ob = this.__ob__;

    switch (method) {
      case 'push':
      case 'unshift':
        // push('新增的元素') unshift('新增的元素')
        inserted = args;
        break;
      case 'splice':
        // splice(from, delete, '新增的元素')
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    // 4. 如果新增的元素是对象, 需要对新增的元素进行观测
    if (inserted) {
      ob.observeArray(inserted);
    }
    return result;
  };
});

export { arrMethods };
