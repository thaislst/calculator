let value = 0.0

// const clickFn = (num) => () => {
//   if(num == 'CE' || num == 'C') {
//     setValue(0)
//   } else {
//     appendValue(parseInt(num))
//   } 
// }

function clickFn(num) {
  return function() {
    if(num == 'CE' || num == 'C') {
      setValue(0)
    } else {
      appendValue(parseInt(num))
    }
  }
}

function appendValue(num) {
  value *= 10
  value += num
  updateValueOnScreen()
}

function setValue(num) {
  value = num
  updateValueOnScreen()
}

function updateValueOnScreen() {
  document.querySelector('.current-value').innerText = value;
  console.log('updated', value)

}

function updateLastCalc() {
  document.querySelector('#last-calc').innerText = value;
  console.log('updated', value)

}

const handleClickStart = (el) => () => {
  el.classList.add('clicked')
}

const handleClickEnd = (el) => () => {
  el.classList.remove('clicked')
}

addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach((el) => {
    el.addEventListener('click', clickFn(el.innerText, el.dataset.operator))

    
    el.addEventListener('touchstart', handleClickStart(el))
    el.addEventListener('mousedown', handleClickStart(el))

    el.addEventListener('touchend', handleClickEnd(el))
    el.addEventListener('mouseup', handleClickEnd(el))
    
  })

  updateValueOnScreen()
  updateLastCalc()
})


