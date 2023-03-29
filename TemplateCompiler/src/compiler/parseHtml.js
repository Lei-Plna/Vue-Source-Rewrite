// id="app" id='app' id=app
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
//标签名  <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

function parseHtmlToAst(html) {
  // 用以保存当前的文字内容
  let text,
    // 根元素
    root,
    // 当前元素的父节点元素
    currentParent,
    // 当前模板的元素集合
    stack = [];

  while (html) {
    // 判断是否是标签开始
    let tagStartIdx = html.indexOf('<');
    // 当前标签是开始标签
    if (tagStartIdx === 0) {
      const startTagMatch = parseStartTag();

      if (startTagMatch) {
        const { tagName, attrs } = startTagMatch;
        parseElement(tagName, attrs);
        continue;
      }

      // 如果匹配的是结束标签
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        // 整理目前的元素解构
        formatStructure();
        continue;
      }
    }
    // 若"<"的索引>0意味着，目前扫描到的并不是一个元素，而是一个纯文本
    if (tagStartIdx > 0) {
      text = html.substring(0, tagStartIdx);
      if (text) {
        advance(text.length);
        createText(text);
      }
    }
  }
  return root;

  function createText(text) {
    text = text.trim();
    if (text.length) {
      currentParent.children.push({
        type: 3,
        tag: 'text',
        text,
      });
    }
  }
  function advance(length) {
    html = html.substring(length);
  }

  function parseStartTag() {
    // 匹配html中是否含有开始标签'<'
    const start = html.match(startTagOpen);

    // 用于记录匹配HTML中的结束标签正则、属性正则结果
    let end, attr;

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      // 去掉开始标签匹配到的所有内容
      advance(start[0].length);

      // 匹配开始标签中的所有属性
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        match.attrs.push({
          name: attr[1],
          // 对于属性值的匹配会根据传入值的不同而在不同的位置
          // 如 id="value" value便是在attr[3]
          // id = 'value' value便是在attr[4]
          // id = value value便是在attr[5]
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }

      // 匹配到结束标签之后
      if (end) {
        // 删除字段中的">"内容, 并返回生成的标签内容
        advance(end[0].length);
        return match;
      }
    }
  }

  function parseElement(tagName, attrs) {
    // 根据当前属性创建一个抽象语法树对象
    const element = createAstElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  }

  function formatStructure() {
    // 从元素集合中取出最后一项 -> 最里层的子元素
    const element = stack.pop();
    // 目前元素集合中的最后一项 -> 最里层子元素的父元素节点
    currentParent = stack[stack.length - 1];
    // 可能不存在此项 -> 里层元素便是最外层元素
    if (currentParent) {
      // 给子元素设置父元素属性
      element.parent = currentParent;
      // 将子元素添加至父元素的children属性中
      currentParent.children.push(element);
    }
  }

  function createAstElement(tagName, attrs) {
    return {
      type: 1,
      tag: tagName,
      children: [],
      parent: null,
      attrs,
    };
  }
}

export { parseHtmlToAst };
