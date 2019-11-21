class A {
  constructor () {
    this.nameA = 'a'
  }
  validateA () {
    console.log('A')
  }
}

class B extends A {
  constructor () {
    super()
    this.nameB = 'b'
  }
  validateB () {
    console.log("B")
  }
}

class C extends B {
  constructor () {
    super()
	this.nameC = 'c'
  }
  validateC () {
    console.log('c')
  }
}

const c = new C()
function findMembers (type, name, validate) {
	
}

// const members = findMembers(c, 'name', 'validate');
// console.log(members)

console.log(c, 12321)
