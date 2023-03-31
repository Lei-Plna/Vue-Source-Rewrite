// 
const mustacheRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function generateRenderFunction(ast) {
  let children = getChildren(ast);
  // 注意此处不应该换行
  // 会导致new Function return返回 undefined
  let code = `_c('${ast.tag}',${
    ast.attrs.length > 0
    ? `${formatProps(ast.attrs)}`
    : 'undefined'
  }${
    children ? 
      `,${children.join(',')}`
    : ''
  })`;
  return code;
}

function getChildren(ast) {
  const children = ast.children;

  if (children) {
    return children.map(child => generateChild(child));
  }
}

function generateChild(child) {
  // 如果子元素是一个元素节点
  if (child.type === 1) {
    // 递归执行主函数
    return generateRenderFunction(child);
  } 
  // 如果资源素是一个文本节点
  else if (child.type === 3) {
    let text = child.text;
    
    // 1. 文本中不含有Mustache表达式
    // eg: 大家都来学习Vue源码
    if (!mustacheRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    }

    // 2. 文本中含有Mustache表达式
    let match,
      index,
      lastIndex = mustacheRE.lastIndex = 0,
      textArr = [];
    
    while(match = mustacheRE.exec(text)) {
      // 匹配到的索引
      index = match.index;
      if (index > lastIndex) {
        textArr.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      textArr.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
      textArr.push(JSON.stringify(text.slice(lastIndex)));
    }
    
    return `_v(${textArr.join('+')})`;
  }
}

function formatProps(attrs) {
  let attrStr = '';
  attrs.forEach(attr => {
    let { name, value } = attr;
    if (name === 'style') {
      // 创建一个对象用以存储解析后的样式属性
      let styleObject = {};
      // eg: value: "color: red; font-size: 20px" => ['color:red', 'font-size:20px']
      value.split(';').map(style => {
        // eg: color: red => ['color', 'red']
        const [styleKey, styleVal] = style.split(':');
        styleObject[styleKey.trim()] = styleVal.trim();
      });
      // 将最终的解析结果重新赋值给当前attr对象的value
      value = styleObject;
    }
    // 拼接解析得到的key和value
    attrStr += `"${name}":${JSON.stringify(value)},`
  });
  // 去除最后一位的","后返回字符串
  return `{${attrStr.slice(0, -1)}}`;
}

export {
  generateRenderFunction
}