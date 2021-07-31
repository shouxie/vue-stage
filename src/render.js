import { isObject } from "./utils"
import {createElement, createText} from './vdom'

export function  renderMixin(Vue) {
  Vue.prototype._c = function () { // craeteElement 创建元素型的节点
    console.log(arguments)
    const vm = this
    return createElement(vm, ...arguments)
  }

  Vue.prototype._v = function (text) { // 创建文本型的节点
    console.log(text)
    console.log(arguments)
    const vm = this
    return createText(vm, text) // 描述虚拟节点是属于哪个实例的
  }

  Vue.prototype._s = function (val) { // stringify()
    console.log(arguments)
    if (isObject(val)) return JSON.stringify(val)
    return val
  }
  Vue.prototype._render = function() {
    const vm = this // vm中有所有的数据 vm.xxx vm._data.xxx
    let { render} = vm.$options
    debugger
    let vnode = render.call(vm)
    return vnode
    console.log(vnode)
  }
}