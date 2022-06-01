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
    //if display exceed
    if(storedNumber.length >= 22) {
      alert('You can\'t add more numbers, you have exceeded the allowed numbers to be displayed on screen');
      storedNumber = storedNumber.substring(0, 21);
    }
    //add default 0 if the first input is decimal point;
    if(storedNumber.startsWith('.')) {
      storedNumber = '0' + storedNumber;
      console.log('starts with decimal');
    }
    //display clicked numebr button on screen
    currentNum.textContent = storedNumber;
    //limit decimal to 1;
    if(storedNumber.includes('.')) {
      console.log('contains decimal');
      decimalBtn.disabled = true;
    } else {
      decimalBtn.disabled = false;
    }
   })
 });

 //Event on Operator Buttons
 operatorBtn.forEach((operator) => {
   operator.addEventListener('click', () => {
     //reenable disabled button when an operator is clicked
     decimalBtn.disabled = false;
     //to string together several operations and still get the answer
     if(firstNumber && storedNumber) {
       calculate();
     }
     //store the first number
     firstNumber = storedNumber;
     clickedOperator = operator.textContent;
     //display previous num and clicked operator at the upper part of screen
     previousNum.textContent = `${storedNumber} ${clickedOperator}`;
     //to not over-flow screen
     previousNum.style.wordWrap = 'hidden';
     //reset the number to allow to type-in for the second operand
     storedNumber = '';
     console.log('storedNumber = ' + storedNumber);
     console.log('result = ' + result);
     console.log('firstNumber = ' + firstNumber);
   })
 });

 //Event on Equals Button
 equalsBtn.addEventListener('click', calculate);

 //Event on Clear Button 
 clearBtn.addEventListener('click', () => {
   window.location.reload();
 });

 //Event on Delete Button
 deleteBtn.addEventListener('click', deleteNumber);

 //To Erase
 function deleteNumber() {
  const toArray = storedNumber.split('');
  const toRemove = toArray.pop();
  const returnString = toArray.join('');
  storedNumber = returnString;
  currentNum.textContent = storedNumber;
 }

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
    cantDivideByZero();
 }

 //To Alert User not to Divide a Number By Zero
 function cantDivideByZero() {
  if(roundedResult === 'Infinity') {
    alert('Sorry, You can\'t divide by 0');
    currentNum.textContent = 0;
    previousNum.textContent = `${firstNumber} ${clickedOperator}`;
    //makes the first operand as zero once the user clicked a different operator.
    result = 0;
    storedNumber = 0;
  }
}