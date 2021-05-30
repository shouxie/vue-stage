function xxx () {
  with(this) {
    console.log(name, age)
  }
}

const data = {
  name: 'xxx',
  age: 12
}

xxx.call(data) // xxx 12

data.age = 13

xxx.call(data)  // xxx 13

const data1 = {
}

xxx.call(data1) // error name is not defined