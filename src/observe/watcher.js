class Watcher {
  constructor(vm, fn, cb, options) { // $watch 要将dep放到watcher中
    this.vm = vm
    this.fn = fn
    this.cb = cb
    this.options = options

    this.getter = fn // fn 就是页面渲染逻辑

    this.get() // 标示上了后就做一次初始化
  }

  get() {
    this.getter() // 页面渲染逻辑render update 
  }
}

export default Watcher