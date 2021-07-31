
let id = 0
class Dep{
  constructor() { // 要把watcher放到dep
    this.subs = []
    this.id = id++
  }
}


Dep.target = null // 这里用了一个全局的变量 可以看成 window.target

export default Dep