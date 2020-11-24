// 简单版本的多属性运动函数
var a11=1
function move(ele, target, fn = () => {}) {
  a11=0
  console.log(a11)
  let timerObj = {}
  for (let key in target) {
    timerObj[key] = setInterval(() => {
      let current = parseInt(window.getComputedStyle(ele)[key])
      let distance = (target[key] - current) / 10
      distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
      if (current === target[key]) {
        clearInterval(timerObj[key])
        a11=1
        console.log(a11)
        delete timerObj[key]
        let n = 0
        for(let k in timerObj) n++
        if (n === 0) fn()
      } else {
        ele.style[key] = distance + current + 'px'
      }
    }, 1)
  }
}
