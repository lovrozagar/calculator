'use strict'

let INITIAL_VALUE = 0;

const total = document.querySelector('.display');
total.textContent = INITIAL_VALUE.toString();

let firstNumber = '';
let operator = '';
let secondNumber = '';
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {

        if (button.textContent === 'AC') {
            total.textContent = 0;
            firstNumber = '';
            operator = '';
            secondNumber = '';
        }
        else if (button.textContent === '=') {
            if (operator === '') {
                total.textContent = firstNumber;
            }
            total.textContent = operate(+firstNumber, operator, +secondNumber);
            firstNumber = total.textContent;
            operator = '';
            secondNumber = '';
        }
        else if (+button.textContent && operator !== '') {
            secondNumber += button.textContent;
            total.textContent = secondNumber;
        }

        else if (button.textContent === '+' || button.textContent === '-' ||
            button.textContent === '*' || button.textContent === '/') {
            operator = button.textContent
        }

        else if (+button.textContent && operator === '') {
            firstNumber += button.textContent;
            total.textContent = firstNumber;
        }
    });
});

function removeZeroInFront(string) {
    return +string.toString();
}

console.log(removeZeroInFront('012344.3'));

function operate(number1, operator, number2) {
    let result = 0;
    switch (operator) {
        case '+': result = add(number1, number2);
            break;
        case '-': result = subtract(number1, number2);
            break;
        case '*': result = multiply(number1, number2);
            break;
        case '/': result = divide(number1, number2);
            break;
    }
    return result;
}

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
    return a / b;
}

