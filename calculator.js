 //Math Functions
 function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b
}

function operate(operator, num1, num2) {
  if(operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === 'x') {
    return multiply(num1, num2);
  } else if (operator === '÷' ) {
    return divide(num1, num2);
  }
}

//DOM Elements
const previousNum = document.querySelector('.previous-number');
const currentNum = document.querySelector('.current-number');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('#decimal');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');

 //Global Variables
 let storedNumber = '';
 let clickedOperator = '';
 let firstNumber = '';
 let result = '';
 let roundedResult = '';
 currentNum.textContent = 0;

 //Event on Number Buttons
 numberBtn.forEach((number) => {
   number.addEventListener('click', () => {
    storedNumber += number.textContent;
    currentNum.textContent = storedNumber;
   })
 });