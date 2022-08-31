'use strict'

const INITIAL_VALUE = 0;

let temporaryTotal = 0;
const total = document.querySelector('.display');
total.textContent = INITIAL_VALUE.toString();

let firstNumber = '0';
let operator = '';
let secondNumber = '0';

const functions = document.querySelectorAll('.operator');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {

    button.addEventListener('click', () => {
        if (button.textContent === 'AC') {
            total.textContent = 0;
            firstNumber = '0';
            operator = '';
            secondNumber = '0';
        }
        else if (button.textContent === '=') {
            if (operator === '') {
                total.textContent = firstNumber;
                return;
            }
            total.textContent = operate(+firstNumber, operator, +secondNumber);
            temporaryTotal = +total.textContent;
            total.textContent = parseFloat(temporaryTotal.toFixed(5));
            if (total.textContent == '0') {
                firstNumber = '0';
            }
            else {
                firstNumber = total.textContent;
            }
            operator = '';
            secondNumber = '';
            functions.forEach(f => {
                f.style.backgroundColor = 'rgb(255, 149, 0)';
            })
        }
        else if (button.textContent === 'C') {
            if (operator) {
                if (secondNumber.length === 1) {
                    secondNumber = '0';
                    total.textContent = '0';
                }
                else {
                    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
                    total.textContent = secondNumber;  
                }
            }
            else if (!operator) {
                if (firstNumber.length === 1) {
                    firstNumber = '0';
                    total.textContent = '0';
                }
                else {
                    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
                    total.textContent = firstNumber;      
                }
            };
        }
        else if (button.textContent === '+/-') {
            if (operator) {
                if (secondNumber.slice(0, 1) === '-') {
                    secondNumber = secondNumber.slice(1, secondNumber.length);
                }
                else {
                    secondNumber = '-' + secondNumber;
                }
                total.textContent = secondNumber; 
            }
            else if (!operator) {
                if (firstNumber.slice(0, 1) === '-') {
                    firstNumber = firstNumber.slice(1, firstNumber.length);
                }
                else {
                    firstNumber = '-' + firstNumber;
                }
                total.textContent = firstNumber; 
            };
        }
        else if ((Number.isInteger(+button.textContent) || button.textContent === '.') && operator !== '' && total.textContent.length < 9) {
            if (Number.isInteger(+button.textContent)) {
                secondNumber += button.textContent;
                secondNumber = removeZeroInFront(secondNumber);
            }
            else if (!(secondNumber.includes(".") && button.textContent === '.')) {
                secondNumber += button.textContent;
            }
            total.textContent = secondNumber;
        }

        else if (button.textContent === '+' || button.textContent === '-' ||
            button.textContent === '*' || button.textContent === '/') {
            operator = button.textContent
        }

        else if ((Number.isInteger(+button.textContent) || button.textContent === '.') && operator === '' && total.textContent.length < 9) {
            if (Number.isInteger(+button.textContent)) {
                firstNumber += button.textContent;
                firstNumber = removeZeroInFront(firstNumber);
            }
            else if (!(firstNumber.includes(".") && button.textContent === '.')) {
                firstNumber += button.textContent;
            }
            total.textContent = firstNumber;
            changeNumber1Sign = 1;
        }
    });
});

function removeZeroInFront(string) {
    if (string === '-0') {
        return string;
    }
    string = +string;
    return string.toString()
}

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

function operatorToName(operator) {
    let name;
    switch (operator) {
        case '/': name = 'div';
            break;
        case '*': name = 'multi';
            break;
        case '-': name = 'minus';
            break;
        case '+': name = 'plus';
            break;
        case '=': name = 'equal';
            break;
    }
    return name;
}