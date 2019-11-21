function func1() {
  func2()
}

async function func2() {
    try {
      func3()
  } catch (error) {
    console.log('error', 123123)
  }
}
 function func3() {
   return new Promise((resolve, reject) => {
     setTimeout(function () {
       const r = Math.random()
       if (r < .5) {
         reject('error')
       }
     }, 1000)
   })
}
func1()
