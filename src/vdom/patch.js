
export function patch(el, vnode) { // 根据虚拟节点创造了真实节点
  // 删除老节点 根据vnode创建新节点 替换掉老节点

  const elm = createElm(vnode)
  debugger
  // el.nextSibling 不存在就是null 如果为null insertBefore就是appendChild
  const parentNode = el.parentNode
  parentNode.insertBefore(elm, el.nextSibling)

  parentNode.removeChild(el)
  return elm // 返回最新节点
}
// 面试： 虚拟节点 的实现 ，如何将虚拟节点渲染成真实节点
function createElm(vnode) {
  let {tag, data, children, text, vm} = vnode

  // 让虚拟节点 和真实节点做一个映射关系, 后续某个虚拟节点更新了，可以跟踪到真实节点并且更新真实节点
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    // 如果有data属性 ，需要把data设置到元素上
    updateProperties(vnode.el, data)

    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    });
  }else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function updateProperties(el, props={}) { // 后续写diff算法的时候再进行完善

  // 这里没有考虑样式等
  for(let key in props) {
    el.setAttribute(key, props[key])
  }
}