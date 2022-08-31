'use strict'

const INITIAL_VALUE = 0;

const total = document.querySelector('.display');
total.textContent = INITIAL_VALUE.toString();

let error = false;
let temporaryButton = '';
let temporaryTotal = 0;
let firstNumber = '0';
let operator = '';
let secondNumber = '0';

const operators = document.querySelectorAll('.operator');
const functions = document.querySelectorAll('.function');
const numbers = document.querySelectorAll('.number');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    changeButtonColorOnPress();

    button.addEventListener('click', () => {
        if (button.textContent === 'AC') {
            clearAll();
        }
        else if (button.textContent === '=') {
            displayResult();
        }
        else if (button.textContent === 'C') {
            removeLastDigit();
        }
        else if (button.textContent === '+/-') {
            changeSign();
        }
        else if ((Number.isInteger(+button.textContent) || button.textContent === '.') && operator !== '' && total.textContent.length < 9) {
            temporaryButton = button.textContent;
            secondNumber = displayNumber(temporaryButton, secondNumber);
        }
        else if (button.textContent === '+' || button.textContent === '-' ||
            button.textContent === '*' || button.textContent === '/') {
            if (operator && secondNumber !== '0') {
                displayResult();
            }
            operator = button.textContent;
        }
        else if ((Number.isInteger(+button.textContent) || button.textContent === '.') && operator === '' && total.textContent.length < 9) {
            temporaryButton = button.textContent;
            firstNumber = displayNumber(temporaryButton, firstNumber);
        }
    });
});

function changeButtonColorOnPress() {

    operators.forEach(op => {
        op.addEventListener('click', () => {

            operators.forEach(op => {
                op.classList.remove('op-click', 'equal-white');
            });

            if (op.textContent === '=') {
                op.classList.add('equal-white');
                setTimeout(() => {
                    op.classList.remove('equal-white');
                }, 200);
            }
            else {
                op.classList.add('op-click');
            }
        });
    });

    functions.forEach(func => {
        func.addEventListener('click', () => {
            func.classList.toggle('func-click');
            setTimeout(() => {
                func.classList.toggle('func-click');
                func.classList.add('func');
            }, 200);
        });
    });

    numbers.forEach(num => {
        num.addEventListener('click', () => {
            num.classList.toggle('num-click');
            setTimeout(() => {
                num.classList.toggle('num-click');
                num.classList.add('num');
            }, 200);
        });
    });
}

function displayNumber(button, number) {
    if (Number.isInteger(+button)) {
        number += button;
        number = removeZeroInFront(number);
    }
    else if (!(number.includes(".") && button === '.')) {
        number += button;
    }
    total.textContent = number;
    return number;
}

function displayResult() {
    if (operator === '') {
        total.textContent = firstNumber;
        return;
    }
    total.textContent = operate(+firstNumber, operator, +secondNumber);
    temporaryTotal = +total.textContent;
    if (isNaN(temporaryTotal) || (!isFinite(temporaryTotal))) {
        total.textContent = 'Lmao';
    }
    else {
        total.textContent = parseFloat(temporaryTotal.toFixed(5));
    }

    if (total.textContent == '0') {
        firstNumber = '0';
    }
    else {
        firstNumber = total.textContent;
    }
    operator = '';
    secondNumber = '0';
}

function clearAll() {
    total.textContent = 0;
    firstNumber = '0';
    operator = '';
    secondNumber = '0';
}

function removeLastDigit() {
    if (operator === '') {
        if (firstNumber.length === 1 || firstNumber === '-0') {
            firstNumber = '0';
        }
        else if (firstNumber.slice(0, 1) === '-' && firstNumber.length === 2) {
            firstNumber = '-0';
        }
        else {
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        }
        total.textContent = firstNumber;
    }
    else {
        if (secondNumber.length === 1 || secondNumber === '-0') {
            secondNumber = '0';
        }
        else if (secondNumber.slice(0, 1) === '-' && secondNumber.length === 2) {
            secondNumber = '-0';
        }
        else {
            secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        }
        total.textContent = secondNumber;
    }
}

function changeSign() {
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