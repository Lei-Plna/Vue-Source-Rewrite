// 打补丁 -> 注入到真实元素节点
function patch(oldNode, vNode) {
  // 将虚拟节点转换成真实节点
  const el = createElement(vNode),
    parentElement = oldNode.parentNode;
  // 将真实节点插入到老节点的后面
  parentElement.insertBefore(el, oldNode.nextSibling);
  // 删除老节点
  parentElement.removeChild(oldNode);
  return el;
}


function createElement(vnode) {
  const { tag, children, text } = vnode;
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach(child => {
      vnode.el.appendChild(createElement(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

function updateProperties(vnode) {
  const { el, props = {} } = vnode;
  for (const key in props) {
    if (key === 'style') {
      for (const styleName in props[key]) {
        el.style[styleName] = props[key][styleName];
      }
    } else if (key === 'class') {
      el.className = props[key];
    } else {
      el.setAttribute(key, props[key]);
    }
  }
}

export {
  patch
}