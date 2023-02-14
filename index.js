let value = 0.0
let value2 = 0.0
const INITIAL_LAST_CALC = '.   '
let lastCalc = INITIAL_LAST_CALC

let operator = null

const clickFn = (num, op) => () => {
  if(num == 'C') {
    resetCalc()
  } else if(num == 'CE') {
    resetCalcLastCalc()
  } else if(op == '%') {
    resetCalc()
  } else if(op == '+') {
    setOperator('+')
  } else if(op == '-') {
    setOperator('-')
  } else if(op == '*') {
    setOperator('*')
  } else if(op == '/') {
    setOperator('/')
  } else if(op == '=') {
    equal()
  } else {
    if(operator === null) {
      appendValue(parseInt(num))
    } else {
      appendValue2(parseInt(num))
    }
  } 
}

const resetCalc = () => {
  value = 0
  value2 = 0
  operator = null
  lastCalc = INITIAL_LAST_CALC
  updateValueOnScreen()
}

const setOperator = (op) => {
  if(operator === null) {
    operator = op
    updateValueOnScreen()
  } else {
    equal()
    operator = op
    updateValueOnScreen()
  }
}


const resetCalcLastCalc = () => {
  value = 0
  value2 = 0
  operator = null
  lastCalc = INITIAL_LAST_CALC
  updateValueOnScreen()
  updateLastCalc()
}

const resetC = () => {
  value2 = 0.0
  operator = null
}


const makeOperation = (fn) => {
  lastCalc = buildOperation()
  value = fn()
  resetC()
  updateValueOnScreen()
  updateLastCalc()
}

const equal = () => {

  if(operator === null) {
    return
  }
  
  if(operator === '+') {
    makeOperation(() => (value + value2))
  } else if(operator === '-') {
    makeOperation(() => (value - value2))
  }  else if(operator === '*') {
    makeOperation(() => (value * value2))
  }  else if(operator === '/') {
    makeOperation(() => (value / value2))
  }
}


function appendValue(num) {
  value *= 10
  value += num
  updateValueOnScreen()
}

function appendValue2(num) {
  value2 *= 10
  value2 += num
  updateValueOnScreen()
}

function setValue(num) {
  value = num
  updateValueOnScreen()
}

const format = (val) => (new Intl.NumberFormat('pt-BR', {maximumFractionDigits: 4}).format(val))

const buildOperation = () => format(value) + ' ' + operator + ' ' + (value2 !== 0 ? format(value2) : '')

const buildOperationPercent = () => format(value) + ' ' + operator + ' ' 

function updateValueOnScreen() {

  let text = format(value)

  if(operator !== null) {
    text = buildOperation()
  }

  document.querySelector('.current-value').innerText = text;
  console.log('updated', text)

}

function updateLastCalc() {
  document.querySelector('#last-calc').innerText = lastCalc;
  console.log('updated', lastCalc)

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

  resetCalc()
  updateLastCalc()
})


