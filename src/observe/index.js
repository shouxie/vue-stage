import { arrayMethods } from "./array";
import { isArray, isObject } from "../utils";

class Observer {
  constructor(value) {
    // 不让__ob__ 被遍历到
    // value.__ob__ = this; // 我给对象和数组添加一个自定义属性
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false, // 标识这个属性不能被列举出来，不能被循环到
    })
    if (isArray(value)) {
      // 更改数组原型方法, 如果是数组 就改写数组的原型链
      value.__proto__ = arrayMethods // 重写数组的方法
      this.observeArray(value)
    }else {
      this.walk(value)
    }
  }

  observeArray(data) { // 对数组内部的数组再次重写/对象（引用类型）
    data.forEach((item)=>observe(item))
  }

  walk(data) {
    Object.keys(data).forEach((key)=>{
      defineReactive(data, key, data[key])
    })

  }
}
// vue2 应用了defineProperty需要一加载的时候 就进行递归操作，所以好性能，如果层次过深也会浪费性能
// 1.性能优化的原则：
// 1) 不要把所有的数据都放在data中，因为所有的数据都会增加get和set
// 2) 不要写数据的时候 层次过深， 尽量扁平化数据 
// 3) 不要频繁获取数据
// 4) 如果数据不需要响应式 可以使用Object.freeze 冻结属性 
function defineReactive(obj, key, value) { // vue2 慢的原因 主要在这个方法中
  observe(value) // 递归进行观测数据，不管有多少层 我都进行
  Object.defineProperty(obj, key, {
    get() {
      return value // 闭包，次此value 会像上层的value进行查找
    },
    set(newValue) { // 如果设置的是一个对象那么会再次进行劫持
      if (newValue === value) return
      observe(newValue)
      console.log('修改')
      value = newValue
    }
  })

}

export function observe(value) {
  if (!isObject(value)) return
  if (value.__ob__) return // 一个对象不需要重新被观测

  // 需要对对象进行观测 （最外层必须是一个{} 不能是数组）

  // 如果一个数据已经被观测过了 ，就不要在进行观测了， 用类来实现，我观测过就增加一个标识 说明观测过了，在观测的时候 可以先检测是否观测过，如果观测过了就跳过检测
  return new Observer(value)
}