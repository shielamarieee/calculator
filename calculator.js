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

 //Event on Operator Buttons
 operatorBtn.forEach((operator) => {
   operator.addEventListener('click', () => {
     //to string together several operations and still get the answer
     if(firstNumber && storedNumber) {
       calculate();
     }
     //store the first number
     firstNumber = storedNumber;
     clickedOperator = operator.textContent;
     //display previous num and clicked operator at the upper part of screen
     previousNum.textContent = `${storedNumber} ${clickedOperator}`;
     //reset the number to allow to type-in for the second operand
     storedNumber = '';
     console.log('storedNumber = ' + storedNumber);
     console.log('result = ' + result);
     console.log('firstNumber = ' + firstNumber);
   })
 });

 //Event on Equals Button
 equalsBtn.addEventListener('click', calculate);

 //To Calculate
 function calculate() {
  //for the equal button to not work when the user didn't type-in for another operand
  if(!storedNumber || !firstNumber) {
    alert('Please type in operand');
    return;
  }
  result = operate(clickedOperator, parseFloat(firstNumber), parseFloat(storedNumber));
  //round off numbers to 3 decimal; converted to string for the split() method works; limit teh result to 21 numbers to nto overflow screen;
  roundedResult = Number(result.toFixed(3)).toString().substring(0, 21);
  currentNum.textContent = roundedResult;
  previousNum.textContent = `${firstNumber} ${clickedOperator} ${storedNumber}`;
  storedNumber = roundedResult;
 }